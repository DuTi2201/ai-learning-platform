"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.optionalAuth = exports.checkAdmin = exports.checkAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        if (error instanceof jwt.JsonWebTokenError) {
            throw new types_1.AppError('Invalid token', 401);
        }
        if (error instanceof jwt.TokenExpiredError) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.js.map