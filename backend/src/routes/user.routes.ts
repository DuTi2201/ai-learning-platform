import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { UserController } from '../controllers/user.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { UserRole } from '../types';

const router = Router();

// Validation rules
const userIdValidation = [
  param('userId')
    .isUUID()
    .withMessage('User ID must be a valid UUID'),
];

const updateUserValidation = [
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
  body('profilePictureUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
  body('role')
    .optional()
    .isIn(Object.values(UserRole))
    .withMessage('Role must be one of: STUDENT, ADMIN'),
];

const updateCurrentUserValidation = [
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
  body('profilePictureUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
  // Role update is handled in controller for non-admin users
];

const updateRoleValidation = [
  body('role')
    .isIn(Object.values(UserRole))
    .withMessage('Role must be one of: STUDENT, ADMIN'),
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
    .custom((value) => {
      if (!value || value === '') return true;
      return value.length >= 2;
    })
    .withMessage('Search query must be at least 2 characters when provided'),
  query('role')
    .optional()
    .custom((value) => {
      if (value === 'ALL') return true;
      return Object.values(UserRole).includes(value);
    })
    .withMessage('Role must be one of: STUDENT, ADMIN, INSTRUCTOR, USER, or ALL'),
];

// Current user routes (protected)
router.get(
  '/me',
  checkAuth,
  UserController.getCurrentUser
);

router.put(
  '/me',
  updateCurrentUserValidation,
  validate,
  checkAuth,
  UserController.updateCurrentUser
);

router.get(
  '/me/progress',
  checkAuth,
  UserController.getCurrentUserProgress
);

router.get(
  '/me/courses',
  checkAuth,
  UserController.getCurrentUserCourses
);

router.get(
  '/me/stats',
  checkAuth,
  UserController.getCurrentUserStats
);

// Public/Protected user routes
router.get(
  '/:userId',
  userIdValidation,
  validate,
  optionalAuth,
  UserController.getUserById
);

router.get(
  '/:userId/progress',
  userIdValidation,
  validate,
  checkAuth,
  UserController.getUserProgress
);

router.get(
  '/:userId/courses',
  userIdValidation,
  validate,
  checkAuth,
  UserController.getUserCourses
);

router.get(
  '/:userId/stats',
  userIdValidation,
  validate,
  checkAuth,
  UserController.getUserStats
);

// Admin only routes
router.get(
  '/',
  paginationValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.getAllUsers
);

router.put(
  '/:userId',
  userIdValidation,
  updateUserValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.updateUser
);

router.patch(
  '/:userId/role',
  userIdValidation,
  updateRoleValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.updateUserRole
);

router.delete(
  '/:userId',
  userIdValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.deleteUser
);

// User management routes (Admin only)
router.get(
  '/admin/list',
  paginationValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.getAllUsers
);

// Instructor management routes (Admin only)
router.get(
  '/instructors/list',
  paginationValidation,
  validate,
  checkAuth,
  checkAdmin,
  UserController.getAllInstructors
);

// Course assignment routes (Admin only)
router.post(
  '/assign-course',
  [
    body('userId')
      .isUUID()
      .withMessage('User ID must be a valid UUID'),
    body('courseId')
      .isUUID()
      .withMessage('Course ID must be a valid UUID'),
  ],
  validate,
  checkAuth,
  checkAdmin,
  UserController.assignCourseToUser
);

router.delete(
  '/:userId/courses/:courseId',
  [
    param('userId')
      .isUUID()
      .withMessage('User ID must be a valid UUID'),
    param('courseId')
      .isUUID()
      .withMessage('Course ID must be a valid UUID'),
  ],
  validate,
  checkAuth,
  checkAdmin,
  UserController.removeCourseFromUser
);

// Get user's assigned courses
router.get(
  '/:userId/assigned-courses',
  userIdValidation,
  validate,
  checkAuth,
  UserController.getUserAssignedCourses
);

export default router;