"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const types_1 = require("../types");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
const userIdValidation = [
    (0, express_validator_1.param)('userId')
        .isUUID()
        .withMessage('User ID must be a valid UUID'),
];
const updateUserValidation = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ max: 255 })
        .withMessage('Name must not exceed 255 characters'),
    (0, express_validator_1.body)('email')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email must be valid')
        .normalizeEmail(),
    (0, express_validator_1.body)('profilePictureUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
    (0, express_validator_1.body)('role')
        .optional()
        .isIn(Object.values(types_1.UserRole))
        .withMessage('Role must be one of: STUDENT, ADMIN'),
];
const updateCurrentUserValidation = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ max: 255 })
        .withMessage('Name must not exceed 255 characters'),
    (0, express_validator_1.body)('email')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email must be valid')
        .normalizeEmail(),
    (0, express_validator_1.body)('profilePictureUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
];
const updateRoleValidation = [
    (0, express_validator_1.body)('role')
        .isIn(Object.values(types_1.UserRole))
        .withMessage('Role must be one of: STUDENT, ADMIN'),
];
const paginationValidation = [
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    (0, express_validator_1.query)('search')
        .optional()
        .trim()
        .custom((value) => {
        if (!value || value === '')
            return true;
        return value.length >= 2;
    })
        .withMessage('Search query must be at least 2 characters when provided'),
    (0, express_validator_1.query)('role')
        .optional()
        .custom((value) => {
        if (value === 'ALL')
            return true;
        return Object.values(types_1.UserRole).includes(value);
    })
        .withMessage('Role must be one of: STUDENT, ADMIN, INSTRUCTOR, USER, or ALL'),
];
router.get('/me', auth_1.checkAuth, user_controller_1.UserController.getCurrentUser);
router.put('/me', updateCurrentUserValidation, validate_1.validate, auth_1.checkAuth, user_controller_1.UserController.updateCurrentUser);
router.get('/me/progress', auth_1.checkAuth, user_controller_1.UserController.getCurrentUserProgress);
router.get('/me/courses', auth_1.checkAuth, user_controller_1.UserController.getCurrentUserCourses);
router.get('/me/stats', auth_1.checkAuth, user_controller_1.UserController.getCurrentUserStats);
router.get('/:userId', userIdValidation, validate_1.validate, auth_1.optionalAuth, user_controller_1.UserController.getUserById);
router.get('/:userId/progress', userIdValidation, validate_1.validate, auth_1.checkAuth, user_controller_1.UserController.getUserProgress);
router.get('/:userId/courses', userIdValidation, validate_1.validate, auth_1.checkAuth, user_controller_1.UserController.getUserCourses);
router.get('/:userId/stats', userIdValidation, validate_1.validate, auth_1.checkAuth, user_controller_1.UserController.getUserStats);
router.get('/', paginationValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.getAllUsers);
router.put('/:userId', userIdValidation, updateUserValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.updateUser);
router.patch('/:userId/role', userIdValidation, updateRoleValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.updateUserRole);
router.delete('/:userId', userIdValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.deleteUser);
router.get('/admin/list', paginationValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.getAllUsers);
router.get('/instructors/list', paginationValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, async (req, res) => {
    try {
        const instructors = await database_1.prisma.instructor.findMany({
            orderBy: { fullName: 'asc' }
        });
        res.json({
            success: true,
            data: instructors.map((instructor) => ({
                id: instructor.id,
                name: instructor.fullName,
                email: instructor.fullName,
                title: instructor.title
            }))
        });
    }
    catch (error) {
        console.error('Error fetching instructors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch instructors'
        });
    }
});
router.post('/assign-course', [
    (0, express_validator_1.body)('userId')
        .isUUID()
        .withMessage('User ID must be a valid UUID'),
    (0, express_validator_1.body)('courseId')
        .isUUID()
        .withMessage('Course ID must be a valid UUID'),
], validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.assignCourseToUser);
router.delete('/:userId/courses/:courseId', [
    (0, express_validator_1.param)('userId')
        .isUUID()
        .withMessage('User ID must be a valid UUID'),
    (0, express_validator_1.param)('courseId')
        .isUUID()
        .withMessage('Course ID must be a valid UUID'),
], validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, user_controller_1.UserController.removeCourseFromUser);
router.get('/:userId/assigned-courses', userIdValidation, validate_1.validate, auth_1.checkAuth, user_controller_1.UserController.getUserAssignedCourses);
exports.default = router;
//# sourceMappingURL=user.routes.js.map