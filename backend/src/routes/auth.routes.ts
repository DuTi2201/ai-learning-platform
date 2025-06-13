import { Router } from 'express';
import passport from '../config/passport';
import { generateToken, checkAuth } from '../middlewares/auth';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, LoginResponse } from '../types';

const router = Router();

// Google OAuth login
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed` }),
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    // Generate JWT token
    const token = generateToken(req.user.id);

    // Set token as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend with success
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?auth=success`);
  })
);

// Get current user info
router.get('/me',
  checkAuth,
  asyncHandler(async (req, res) => {
    const response: ApiResponse<Express.User> = {
      success: true,
      message: 'User information retrieved successfully',
      data: req.user!,
    };

    res.json(response);
  })
);

// Login with JWT (alternative to OAuth for testing)
router.post('/login',
  asyncHandler(async (req, res) => {
    // This endpoint can be used for testing or alternative login methods
    // For now, it's mainly for development purposes
    const response: ApiResponse = {
      success: false,
      message: 'Please use Google OAuth for authentication',
    };

    res.status(400).json(response);
  })
);

// Logout
router.post('/logout',
  asyncHandler(async (req, res) => {
    // Clear JWT cookie
    res.clearCookie('token');
    
    // Logout from Passport session
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Logged out successfully',
    };

    res.json(response);
  })
);

// Refresh token
router.post('/refresh',
  checkAuth,
  asyncHandler(async (req, res) => {
    // Generate new token
    const token = generateToken(req.user!.id);

    // Set new token as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const response: ApiResponse<{ token: string }> = {
      success: true,
      message: 'Token refreshed successfully',
      data: { token },
    };

    res.json(response);
  })
);

export default router;