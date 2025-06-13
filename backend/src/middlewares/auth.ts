import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AppError, UserRole } from '../types';
import { asyncHandler } from './errorHandler';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: UserRole;
        createdAt: Date;
      };
    }
  }
}

// Check if user is authenticated
export const checkAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Check if user is authenticated via session (Passport)
    else if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      console.log('User authenticated via session:', req.user);
      req.user = req.user as Express.User;
      return next();
    }

    console.log('No authentication found:');
    console.log('- Authorization header:', req.headers.authorization);
    console.log('- Cookie token:', req.cookies?.token);
    console.log('- Session authenticated:', req.isAuthenticated?.());
    console.log('- Session user:', req.user);

    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        iat: number;
        exp: number;
      };

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          googleId: true,
          email: true,
          fullName: true,
          profilePictureUrl: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new AppError('User not found', 401);
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token expired', 401);
      }
      throw error;
    }
  }
);

// Check if user has admin role
export const checkAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Access denied. User not authenticated.', 401);
    }

    if (req.user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    next();
  }
);

// Optional authentication - doesn't throw error if no token
export const optionalAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      req.user = req.user as Express.User;
      return next();
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        iat: number;
        exp: number;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          googleId: true,
          email: true,
          fullName: true,
          profilePictureUrl: true,
          role: true,
          createdAt: true,
        },
      });

      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Silently ignore token errors for optional auth
    }

    next();
  }
);

// Generate JWT token
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign({ userId }, secret, { expiresIn: '7d' }) as string;
};