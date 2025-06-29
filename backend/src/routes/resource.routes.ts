import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { ResourceController } from '../controllers/resource.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { ResourceType } from '../types';

const router = Router();

// Validation rules
const resourceIdValidation = [
  param('resourceId')
    .isUUID()
    .withMessage('Resource ID must be a valid UUID'),
];

const lessonIdValidation = [
  param('lessonId')
    .isUUID()
    .withMessage('Lesson ID must be a valid UUID'),
];

const createResourceValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),

  body('resourceType')
    .isIn(Object.values(ResourceType))
    .withMessage('Type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
  body('url')
    .optional()
    .trim()
    .custom((value) => {
      if (!value) return true;
      // Allow protocol-relative URLs (starting with //)
      if (value.startsWith('//')) {
        return true;
      }
      // Validate normal URLs
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error('URL must be a valid URL');
      }
    })
    .withMessage('URL must be a valid URL'),
  body('lessonId')
    .isUUID()
    .withMessage('Lesson ID must be a valid UUID'),
];

const updateResourceValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('resourceType')
    .optional()
    .isIn(Object.values(ResourceType))
    .withMessage('Type must be one of: PDF, QUIZ, LINK, RECORDING'),
  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('URL must be a valid URL'),
];

const resourceTypeValidation = [
 query('type')
    .isIn(Object.values(ResourceType))
    .withMessage('Type must be one of: PDF, QUIZ, LINK, RECORDING'),
];

const searchValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
  query('type')
    .optional()
    .isIn(Object.values(ResourceType))
    .withMessage('Type must be one of: PDF, QUIZ, LINK, RECORDING'),
  query('lessonId')
    .optional()
    .isUUID()
    .withMessage('Lesson ID must be a valid UUID'),
];

const bulkCreateValidation = [
  body('resources')
    .isArray({ min: 1 })
    .withMessage('Resources must be an array with at least one item'),
  body('resources.*.title')
    .trim()
    .notEmpty()
    .withMessage('Each resource title is required')
    .isLength({ max: 255 })
    .withMessage('Each resource title must not exceed 255 characters'),
  body('resources.*.description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Each resource description must not exceed 1000 characters'),
  body('*.resourceType')
      .isIn(Object.values(ResourceType))
      .withMessage('Each resource type must be one of: PDF, QUIZ, LINK, RECORDING'),
  body('resources.*.url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Each resource URL must be a valid URL'),
];

// Public routes (with optional authentication)
router.get(
  '/lesson/:lessonId',
  lessonIdValidation,
  validate,
  optionalAuth,
  ResourceController.getResourcesByLesson
);

router.get(
  '/search',
  searchValidation,
  validate,
  optionalAuth,
  ResourceController.searchResources
);

router.get(
  '/type/:type',
  resourceTypeValidation,
  validate,
  optionalAuth,
  ResourceController.getResourcesByType
);

// Get all resources
router.get(
  '/',
  optionalAuth,
  ResourceController.getAllResources
);

router.get(
  '/:resourceId',
  resourceIdValidation,
  validate,
  optionalAuth,
  ResourceController.getResourceById
);

// Admin only routes
router.post(
  '/',
  createResourceValidation,
  validate,
  checkAuth,
  checkAdmin,
  ResourceController.createResource
);

router.put(
  '/:resourceId',
  resourceIdValidation,
  updateResourceValidation,
  validate,
  checkAuth,
  checkAdmin,
  ResourceController.updateResource
);

router.delete(
  '/:resourceId',
  resourceIdValidation,
  validate,
  checkAuth,
  checkAdmin,
  ResourceController.deleteResource
);

router.post(
  '/lesson/:lessonId/bulk',
  lessonIdValidation,
  bulkCreateValidation,
  validate,
  checkAuth,
  checkAdmin,
  ResourceController.bulkCreateResources
);

export default router;