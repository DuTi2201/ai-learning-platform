import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    
    switch (prismaError.code) {
      case 'P2002':
        error = new AppError('Duplicate field value entered', 400);
        break;
      case 'P2014':
        error = new AppError('Invalid ID provided', 400);
        break;
      case 'P2003':
        error = new AppError('Invalid input data', 400);
        break;
      case 'P2025':
        error = new AppError('Record not found', 404);
        break;
      default:
        error = new AppError('Database error', 500);
    }
  }

  // Prisma validation errors
  if (err.name === 'PrismaClientValidationError') {
    error = new AppError('Invalid data provided', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
    error = new AppError(message, 400);
  }

  // Cast errors
  if (err.name === 'CastError') {
    error = new AppError('Invalid ID format', 400);
  }

  // Default to 500 server error
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      error: error,
    }),
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};