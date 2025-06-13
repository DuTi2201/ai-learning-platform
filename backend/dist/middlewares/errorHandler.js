"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = void 0;
const types_1 = require("../types");
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
    });
    if (err.name === 'PrismaClientKnownRequestError') {
        const prismaError = err;
        switch (prismaError.code) {
            case 'P2002':
                error = new types_1.AppError('Duplicate field value entered', 400);
                break;
            case 'P2014':
                error = new types_1.AppError('Invalid ID provided', 400);
                break;
            case 'P2003':
                error = new types_1.AppError('Invalid input data', 400);
                break;
            case 'P2025':
                error = new types_1.AppError('Record not found', 404);
                break;
            default:
                error = new types_1.AppError('Database error', 500);
        }
    }
    if (err.name === 'PrismaClientValidationError') {
        error = new types_1.AppError('Invalid data provided', 400);
    }
    if (err.name === 'JsonWebTokenError') {
        error = new types_1.AppError('Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
        error = new types_1.AppError('Token expired', 401);
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = new types_1.AppError(message, 400);
    }
    if (err.name === 'CastError') {
        error = new types_1.AppError('Invalid ID format', 400);
    }
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
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map