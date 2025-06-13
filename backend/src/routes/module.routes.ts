import { Router } from 'express';
import { ModuleController } from '../controllers/module.controller';
import { checkAuth, checkAdmin, optionalAuth } from '../middlewares/auth';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validate';

const router = Router();

// Validation rules
const createModuleValidation = [
  body('courseId')
    .isUUID()
    .withMessage('Course ID must be a valid UUID'),
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('moduleOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Module order must be a positive integer'),
];

const updateModuleValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('moduleOrder')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Module order must be a positive integer'),
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

const reorderModulesValidation = [
  body('moduleOrders')
    .isArray({ min: 1 })
    .withMessage('Module orders must be a non-empty array'),
  body('moduleOrders.*.moduleId')
    .isUUID()
    .withMessage('Each module ID must be a valid UUID'),
  body('moduleOrders.*.order')
    .isInt({ min: 1 })
    .withMessage('Each order must be a positive integer'),
];

// Public routes (with optional auth)
router.get('/course/:courseId', optionalAuth, courseIdValidation, validate, ModuleController.getModulesByCourse);
router.get('/:moduleId', optionalAuth, moduleIdValidation, validate, ModuleController.getModuleById);

// Admin routes
router.use(checkAuth);
router.use(checkAdmin);

router.get('/', ModuleController.getAllModules);
router.post('/', createModuleValidation, validate, ModuleController.createModule);
router.put('/:moduleId', moduleIdValidation, updateModuleValidation, validate, ModuleController.updateModule);
router.delete('/:moduleId', moduleIdValidation, validate, ModuleController.deleteModule);
router.put('/course/:courseId/reorder', courseIdValidation, reorderModulesValidation, validate, ModuleController.reorderModules);

export default router;