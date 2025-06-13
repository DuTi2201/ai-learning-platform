import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validate';

const router = Router();

// Validation rules
const createCourseValidation = [
  body('courseCode')
    .notEmpty()
    .withMessage('Course code is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Course code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage('Course code must contain only uppercase letters, numbers, underscores, and hyphens'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

const updateCourseValidation = [
  body('courseCode')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Course code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage('Course code must contain only uppercase letters, numbers, underscores, and hyphens'),
  body('title')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

const courseIdValidation = [
  param('courseId')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),
];

// Public routes (with optional auth)
router.get('/', optionalAuth, CourseController.getAllCourses);
router.get('/:courseId', optionalAuth, courseIdValidation, validate, CourseController.getCourseById);

// Protected routes (require authentication)
router.use(checkAuth);

// User routes
router.get('/my/enrolled', CourseController.getMyEnrolledCourses);
router.post('/:courseId/enroll', courseIdValidation, validate, CourseController.enrollInCourse);
router.delete('/:courseId/enroll', courseIdValidation, validate, CourseController.unenrollFromCourse);

// Admin routes
router.use(checkAdmin);
router.post('/', createCourseValidation, validate, CourseController.createCourse);
router.put('/:courseId', courseIdValidation, updateCourseValidation, validate, CourseController.updateCourse);
router.delete('/:courseId', courseIdValidation, validate, CourseController.deleteCourse);

export default router;