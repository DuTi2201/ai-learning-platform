"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../config/passport"));
const auth_1 = require("../middlewares/auth");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed` }), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?error=auth_failed`);
    }
    const token = (0, auth_1.generateToken)(req.user.id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?auth=success`);
}));
router.get('/me', auth_1.checkAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const response = {
        success: true,
        message: 'User information retrieved successfully',
        data: req.user,
    };
    res.json(response);
}));
router.post('/login', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const response = {
        success: false,
        message: 'Please use Google OAuth for authentication',
    };
    res.status(400).json(response);
}));
router.post('/logout', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.clearCookie('token');
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
    });
    const response = {
        success: true,
        message: 'Logged out successfully',
    };
    res.json(response);
}));
router.post('/refresh', auth_1.checkAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const token = (0, auth_1.generateToken)(req.user.id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const response = {
        success: true,
        message: 'Token refreshed successfully',
        data: { token },
    };
    res.json(response);
}));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map