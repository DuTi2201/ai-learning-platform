import { Router } from 'express';
import passport from 'passport';
import { asyncHandler } from '../middleware/asyncHandler';
import { checkAuth } from '../middleware/auth';
import { generateToken } from '../utils/jwt';
import { ApiResponse } from '../types';

const router = Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/auth/callback?error=auth_failed` }),
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?error=auth_failed`);
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

    // Redirect to frontend auth callback with success
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?auth=success`);
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

// Login endpoint (placeholder for future implementation)
router.post('/login',
  asyncHandler(async (req, res) => {
    const response: ApiResponse<null> = {
      success: false,
      message: 'Direct login not implemented. Please use Google OAuth.',
      data: null,
    };

    res.status(501).json(response);
  })
);

// Logout endpoint
router.post('/logout',
  asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Destroy session if using sessions
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
        }
      });
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Logged out successfully',
      data: null,
    };

    res.json(response);
  })
);

export default router;
