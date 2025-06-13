"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.optionalAuth = exports.checkAdmin = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const types_1 = require("../types");
const errorHandler_1 = require("./errorHandler");
exports.checkAuth = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    else if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        req.user = req.user;
        return next();
    }
    if (!token) {
        throw new types_1.AppError('Access denied. No token provided.', 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await database_1.prisma.user.findUnique({
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
            throw new types_1.AppError('User not found', 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new types_1.AppError('Invalid token', 401);
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new types_1.AppError('Token expired', 401);
        }
        throw error;
    }
});
exports.checkAdmin = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user) {
        throw new types_1.AppError('Access denied. User not authenticated.', 401);
    }
    if (req.user.role !== 'ADMIN') {
        throw new types_1.AppError('Access denied. Admin privileges required.', 403);
    }
    next();
});
exports.optionalAuth = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    else if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        req.user = req.user;
        return next();
    }
    if (!token) {
        return next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await database_1.prisma.user.findUnique({
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
    }
    catch (error) {
    }
    next();
});
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ userId }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.js.map