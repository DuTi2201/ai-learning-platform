"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const instructor_controller_1 = require("../controllers/instructor.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
const instructorIdValidation = [
    (0, express_validator_1.param)('instructorId')
        .isUUID()
        .withMessage('Instructor ID must be a valid UUID'),
];
const createInstructorValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 255 })
        .withMessage('Name must not exceed 255 characters'),
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid')
        .normalizeEmail(),
    (0, express_validator_1.body)('bio')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Bio must not exceed 1000 characters'),
    (0, express_validator_1.body)('expertise')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Expertise must not exceed 500 characters'),
    (0, express_validator_1.body)('profilePictureUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
];
const updateInstructorValidation = [
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
    (0, express_validator_1.body)('bio')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Bio must not exceed 1000 characters'),
    (0, express_validator_1.body)('expertise')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Expertise must not exceed 500 characters'),
    (0, express_validator_1.body)('profilePictureUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
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
        .isLength({ min: 2 })
        .withMessage('Search query must be at least 2 characters'),
];
router.get('/', paginationValidation, validate_1.validate, auth_1.optionalAuth, instructor_controller_1.InstructorController.getAllInstructors);
router.get('/:instructorId', instructorIdValidation, validate_1.validate, auth_1.optionalAuth, instructor_controller_1.InstructorController.getInstructorById);
router.get('/:instructorId/lessons', instructorIdValidation, validate_1.validate, auth_1.optionalAuth, instructor_controller_1.InstructorController.getInstructorLessons);
router.get('/:instructorId/stats', instructorIdValidation, validate_1.validate, auth_1.optionalAuth, instructor_controller_1.InstructorController.getInstructorStats);
router.post('/', createInstructorValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, instructor_controller_1.InstructorController.createInstructor);
router.put('/:instructorId', instructorIdValidation, updateInstructorValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, instructor_controller_1.InstructorController.updateInstructor);
router.delete('/:instructorId', instructorIdValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, instructor_controller_1.InstructorController.deleteInstructor);
exports.default = router;
//# sourceMappingURL=instructor.routes.js.map