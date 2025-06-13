"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const auth_1 = require("../middlewares/auth");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
const createCourseValidation = [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
];
const updateCourseValidation = [
    (0, express_validator_1.body)('courseCode')
        .optional()
        .isLength({ min: 3, max: 20 })
        .withMessage('Course code must be between 3 and 20 characters')
        .matches(/^[A-Z0-9_-]+$/)
        .withMessage('Course code must contain only uppercase letters, numbers, underscores, and hyphens'),
    (0, express_validator_1.body)('title')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    (0, express_validator_1.body)('imageUrl')
        .optional()
        .isURL()
        .withMessage('Image URL must be a valid URL'),
    (0, express_validator_1.body)('isPublished')
        .optional()
        .isBoolean()
        .withMessage('isPublished must be a boolean'),
];
const courseIdValidation = [
    (0, express_validator_1.param)('courseId')
        .isUUID()
        .withMessage('Course ID must be a valid UUID'),
];
router.get('/', auth_1.optionalAuth, course_controller_1.CourseController.getAllCourses);
router.get('/:courseId', auth_1.optionalAuth, courseIdValidation, validate_1.validate, course_controller_1.CourseController.getCourseById);
router.use(auth_1.checkAuth);
router.get('/my/enrolled', course_controller_1.CourseController.getMyEnrolledCourses);
router.post('/:courseId/enroll', courseIdValidation, validate_1.validate, course_controller_1.CourseController.enrollInCourse);
router.delete('/:courseId/enroll', courseIdValidation, validate_1.validate, course_controller_1.CourseController.unenrollFromCourse);
router.use(auth_1.checkAdmin);
router.post('/', createCourseValidation, validate_1.validate, course_controller_1.CourseController.createCourse);
router.put('/:courseId', courseIdValidation, updateCourseValidation, validate_1.validate, course_controller_1.CourseController.updateCourse);
router.delete('/:courseId', courseIdValidation, validate_1.validate, course_controller_1.CourseController.deleteCourse);
exports.default = router;
//# sourceMappingURL=course.routes.js.map