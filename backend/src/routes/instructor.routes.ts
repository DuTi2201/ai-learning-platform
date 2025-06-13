import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { InstructorController } from '../controllers/instructor.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

// Validation rules
const instructorIdValidation = [
  param('instructorId')
    .isUUID()
    .withMessage('Instructor ID must be a valid UUID'),
];

const createInstructorValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio must not exceed 1000 characters'),
  body('expertise')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Expertise must not exceed 500 characters'),
  body('profilePictureUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
];

const updateInstructorValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters'),
  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio must not exceed 1000 characters'),
  body('expertise')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Expertise must not exceed 500 characters'),
  body('profilePictureUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
];

// Public routes (with optional authentication)
router.get(
  '/',
  paginationValidation,
  validate,
  optionalAuth,
  InstructorController.getAllInstructors
);

router.get(
  '/:instructorId',
  instructorIdValidation,
  validate,
  optionalAuth,
  InstructorController.getInstructorById
);

router.get(
  '/:instructorId/lessons',
  instructorIdValidation,
  validate,
  optionalAuth,
  InstructorController.getInstructorLessons
);

router.get(
  '/:instructorId/stats',
  instructorIdValidation,
  validate,
  optionalAuth,
  InstructorController.getInstructorStats
);

// Admin only routes
router.post(
  '/',
  createInstructorValidation,
  validate,
  checkAuth,
  checkAdmin,
  InstructorController.createInstructor
);

router.put(
  '/:instructorId',
  instructorIdValidation,
  updateInstructorValidation,
  validate,
  checkAuth,
  checkAdmin,
  InstructorController.updateInstructor
);

router.delete(
  '/:instructorId',
  instructorIdValidation,
  validate,
  checkAuth,
  checkAdmin,
  InstructorController.deleteInstructor
);

export default router;