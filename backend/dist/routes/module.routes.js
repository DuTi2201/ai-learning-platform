"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_controller_1 = require("../controllers/module.controller");
const auth_1 = require("../middlewares/auth");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
const createModuleValidation = [
    (0, express_validator_1.body)('courseId')
        .isUUID()
        .withMessage('Course ID must be a valid UUID'),
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    (0, express_validator_1.body)('moduleOrder')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Module order must be a positive integer'),
];
const updateModuleValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    (0, express_validator_1.body)('moduleOrder')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Module order must be a positive integer'),
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
const reorderModulesValidation = [
    (0, express_validator_1.body)('moduleOrders')
        .isArray({ min: 1 })
        .withMessage('Module orders must be a non-empty array'),
    (0, express_validator_1.body)('moduleOrders.*.moduleId')
        .isUUID()
        .withMessage('Each module ID must be a valid UUID'),
    (0, express_validator_1.body)('moduleOrders.*.order')
        .isInt({ min: 1 })
        .withMessage('Each order must be a positive integer'),
];
router.get('/course/:courseId', auth_1.optionalAuth, courseIdValidation, validate_1.validate, module_controller_1.ModuleController.getModulesByCourse);
router.get('/:moduleId', auth_1.optionalAuth, moduleIdValidation, validate_1.validate, module_controller_1.ModuleController.getModuleById);
router.use(auth_1.checkAuth);
router.use(auth_1.checkAdmin);
router.get('/', module_controller_1.ModuleController.getAllModules);
router.post('/', createModuleValidation, validate_1.validate, module_controller_1.ModuleController.createModule);
router.put('/:moduleId', moduleIdValidation, updateModuleValidation, validate_1.validate, module_controller_1.ModuleController.updateModule);
router.delete('/:moduleId', moduleIdValidation, validate_1.validate, module_controller_1.ModuleController.deleteModule);
router.put('/course/:courseId/reorder', courseIdValidation, reorderModulesValidation, validate_1.validate, module_controller_1.ModuleController.reorderModules);
exports.default = router;
//# sourceMappingURL=module.routes.js.map