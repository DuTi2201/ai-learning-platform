import { Router } from 'express';
import { LessonController } from '../controllers/lesson.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validate';
import { LessonStatus } from '../types';

const router = Router();

// Validation rules
const createLessonValidation = [
  body('moduleId')
    .isUUID()
    .withMessage('Module ID must be a valid UUID'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Content must not exceed 10000 characters'),
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('Video URL must be a valid URL'),
  body('lessonOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Lesson order must be a positive integer'),
  body('instructorId')
    .optional()
    .isUUID()
    .withMessage('Instructor ID must be a valid UUID'),
];

const updateLessonValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Content must not exceed 10000 characters'),
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('Video URL must be a valid URL'),
  body('lessonOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Lesson order must be a positive integer'),
  body('instructorId')
    .optional()
    .isUUID()
    .withMessage('Instructor ID must be a valid UUID'),
];

const lessonIdValidation = [
  param('lessonId')
    .isUUID()
    .withMessage('Lesson ID must be a valid UUID'),
];

const moduleIdValidation = [
  param('moduleId')
    .isUUID()
    .withMessage('Module ID must be a valid UUID'),
];

const courseIdValidation = [
  param('courseId')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),
];

const progressValidation = [
  body('status')
    .isIn(Object.values(LessonStatus))
    .withMessage(`Status must be one of: ${Object.values(LessonStatus).join(', ')}`),
];

const reorderLessonsValidation = [
  body('lessonOrders')
    .isArray({ min: 1 })
    .withMessage('Lesson orders must be a non-empty array'),
  body('lessonOrders.*.lessonId')
    .isUUID()
    .withMessage('Each lesson ID must be a valid UUID'),
  body('lessonOrders.*.order')
    .isInt({ min: 1 })
    .withMessage('Each order must be a positive integer'),
];

// Public routes (with optional auth)
router.get('/module/:moduleId', optionalAuth, moduleIdValidation, validate, LessonController.getLessonsByModule);
router.get('/:lessonId', optionalAuth, lessonIdValidation, validate, LessonController.getLessonById);

// Protected routes (require authentication)
router.use(checkAuth);

// User routes
router.put('/:lessonId/progress', lessonIdValidation, progressValidation, validate, LessonController.updateLessonProgress);
router.get('/progress/course/:courseId', courseIdValidation, validate, LessonController.getUserLessonProgress);

// Admin routes
router.use(checkAdmin);
router.post('/', createLessonValidation, validate, LessonController.createLesson);
router.put('/:lessonId', lessonIdValidation, updateLessonValidation, validate, LessonController.updateLesson);
router.delete('/:lessonId', lessonIdValidation, validate, LessonController.deleteLesson);
router.put('/module/:moduleId/reorder', moduleIdValidation, reorderLessonsValidation, validate, LessonController.reorderLessons);

export default router;