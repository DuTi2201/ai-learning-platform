"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("../controllers/lesson.controller");
const auth_1 = require("../middlewares/auth");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middlewares/validate");
const types_1 = require("../types");
const router = (0, express_1.Router)();
const createLessonValidation = [
    (0, express_validator_1.body)('moduleId')
        .isUUID()
        .withMessage('Module ID must be a valid UUID'),
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .isLength({ max: 10000 })
        .withMessage('Content must not exceed 10000 characters'),
    (0, express_validator_1.body)('videoUrl')
        .optional()
        .isURL()
        .withMessage('Video URL must be a valid URL'),
    (0, express_validator_1.body)('lessonOrder')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Lesson order must be a positive integer'),
    (0, express_validator_1.body)('instructorId')
        .optional()
        .isUUID()
        .withMessage('Instructor ID must be a valid UUID'),
];
const updateLessonValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .isLength({ max: 10000 })
        .withMessage('Content must not exceed 10000 characters'),
    (0, express_validator_1.body)('videoUrl')
        .optional()
        .isURL()
        .withMessage('Video URL must be a valid URL'),
    (0, express_validator_1.body)('lessonOrder')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Lesson order must be a positive integer'),
    (0, express_validator_1.body)('instructorId')
        .optional()
        .isUUID()
        .withMessage('Instructor ID must be a valid UUID'),
];
const lessonIdValidation = [
    (0, express_validator_1.param)('lessonId')
        .isUUID()
        .withMessage('Lesson ID must be a valid UUID'),
];
const moduleIdValidation = [
    (0, express_validator_1.param)('moduleId')
        .isUUID()
        .withMessage('Module ID must be a valid UUID'),
];
const courseIdValidation = [
    (0, express_validator_1.param)('courseId')
        .isUUID()
        .withMessage('Course ID must be a valid UUID'),
];
const progressValidation = [
    (0, express_validator_1.body)('status')
        .isIn(Object.values(types_1.LessonStatus))
        .withMessage(`Status must be one of: ${Object.values(types_1.LessonStatus).join(', ')}`),
];
const reorderLessonsValidation = [
    (0, express_validator_1.body)('lessonOrders')
        .isArray({ min: 1 })
        .withMessage('Lesson orders must be a non-empty array'),
    (0, express_validator_1.body)('lessonOrders.*.lessonId')
        .isUUID()
        .withMessage('Each lesson ID must be a valid UUID'),
    (0, express_validator_1.body)('lessonOrders.*.order')
        .isInt({ min: 1 })
        .withMessage('Each order must be a positive integer'),
];
router.get('/module/:moduleId', auth_1.optionalAuth, moduleIdValidation, validate_1.validate, lesson_controller_1.LessonController.getLessonsByModule);
router.get('/:lessonId', auth_1.optionalAuth, lessonIdValidation, validate_1.validate, lesson_controller_1.LessonController.getLessonById);
router.use(auth_1.checkAuth);
router.put('/:lessonId/progress', lessonIdValidation, progressValidation, validate_1.validate, lesson_controller_1.LessonController.updateLessonProgress);
router.get('/progress/course/:courseId', courseIdValidation, validate_1.validate, lesson_controller_1.LessonController.getUserLessonProgress);
router.use(auth_1.checkAdmin);
router.post('/', createLessonValidation, validate_1.validate, lesson_controller_1.LessonController.createLesson);
router.put('/:lessonId', lessonIdValidation, updateLessonValidation, validate_1.validate, lesson_controller_1.LessonController.updateLesson);
router.delete('/:lessonId', lessonIdValidation, validate_1.validate, lesson_controller_1.LessonController.deleteLesson);
router.put('/module/:moduleId/reorder', moduleIdValidation, reorderLessonsValidation, validate_1.validate, lesson_controller_1.LessonController.reorderLessons);
exports.default = router;
//# sourceMappingURL=lesson.routes.js.map