"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const errorHandler_1 = require("../middlewares/errorHandler");
const types_1 = require("../types");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.getAllUsers = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search, role } = req.query;
    const result = await user_service_1.UserService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search,
        role: role,
    });
    const response = {
        success: true,
        message: 'Users retrieved successfully',
        data: result.data,
        pagination: result.pagination,
    };
    res.json(response);
});
UserController.getCurrentUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const user = await user_service_1.UserService.getUserById(userId, true);
    const response = {
        success: true,
        message: 'Current user retrieved successfully',
        data: user,
    };
    res.json(response);
});
UserController.getUserById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user?.id;
    const isAdmin = req.user?.role === types_1.UserRole.ADMIN;
    const includePrivate = currentUserId === userId || isAdmin;
    const user = await user_service_1.UserService.getUserById(userId, includePrivate);
    const response = {
        success: true,
        message: 'User retrieved successfully',
        data: user,
    };
    res.json(response);
});
UserController.updateCurrentUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const updateData = req.body;
    if (req.user.role !== types_1.UserRole.ADMIN) {
        delete updateData.role;
    }
    const user = await user_service_1.UserService.updateUser(userId, updateData);
    const response = {
        success: true,
        message: 'Profile updated successfully',
        data: user,
    };
    res.json(response);
});
UserController.updateUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await user_service_1.UserService.updateUser(userId, updateData);
    const response = {
        success: true,
        message: 'User updated successfully',
        data: user,
    };
    res.json(response);
});
UserController.updateUserRole = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await user_service_1.UserService.updateUserRole(userId, role);
    const response = {
        success: true,
        message: 'User role updated successfully',
        data: user,
    };
    res.json(response);
});
UserController.deleteUser = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    await user_service_1.UserService.deleteUser(userId);
    const response = {
        success: true,
        message: 'User deleted successfully',
    };
    res.json(response);
});
UserController.getCurrentUserProgress = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const progress = await user_service_1.UserService.getUserProgress(userId);
    const response = {
        success: true,
        message: 'User progress retrieved successfully',
        data: progress,
    };
    return res.json(response);
});
UserController.getUserProgress = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === types_1.UserRole.ADMIN;
    if (currentUserId !== userId && !isAdmin) {
        const response = {
            success: false,
            message: 'Access denied. You can only view your own progress.',
        };
        return res.status(403).json(response);
    }
    const progress = await user_service_1.UserService.getUserProgress(userId);
    const response = {
        success: true,
        message: 'User progress retrieved successfully',
        data: progress,
    };
    return res.json(response);
});
UserController.getCurrentUserCourses = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const courses = await user_service_1.UserService.getUserEnrolledCourses(userId);
    const response = {
        success: true,
        message: 'User enrolled courses retrieved successfully',
        data: courses,
    };
    return res.json(response);
});
UserController.getUserCourses = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === types_1.UserRole.ADMIN;
    if (currentUserId !== userId && !isAdmin) {
        const response = {
            success: false,
            message: 'Access denied. You can only view your own courses.',
        };
        return res.status(403).json(response);
    }
    const courses = await user_service_1.UserService.getUserEnrolledCourses(userId);
    const response = {
        success: true,
        message: 'User enrolled courses retrieved successfully',
        data: courses,
    };
    return res.json(response);
});
UserController.getCurrentUserStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const stats = await user_service_1.UserService.getUserStats(userId);
    const response = {
        success: true,
        message: 'User statistics retrieved successfully',
        data: stats,
    };
    return res.json(response);
});
UserController.getUserStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === types_1.UserRole.ADMIN;
    if (currentUserId !== userId && !isAdmin) {
        const response = {
            success: false,
            message: 'Access denied. You can only view your own statistics.',
        };
        return res.status(403).json(response);
    }
    const stats = await user_service_1.UserService.getUserStats(userId);
    const response = {
        success: true,
        message: 'User statistics retrieved successfully',
        data: stats,
    };
    return res.json(response);
});
//# sourceMappingURL=user.controller.js.map