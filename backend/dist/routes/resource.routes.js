"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const resource_controller_1 = require("../controllers/resource.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const types_1 = require("../types");
const router = (0, express_1.Router)();
const resourceIdValidation = [
    (0, express_validator_1.param)('resourceId')
        .isUUID()
        .withMessage('Resource ID must be a valid UUID'),
];
const lessonIdValidation = [
    (0, express_validator_1.param)('lessonId')
        .isUUID()
        .withMessage('Lesson ID must be a valid UUID'),
];
const createResourceValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title must not exceed 255 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    (0, express_validator_1.body)('type')
        .isIn(Object.values(types_1.ResourceType))
        .withMessage('Type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
    (0, express_validator_1.body)('url')
        .optional()
        .trim()
        .isURL()
        .withMessage('URL must be a valid URL'),
    (0, express_validator_1.body)('lessonId')
        .isUUID()
        .withMessage('Lesson ID must be a valid UUID'),
];
const updateResourceValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 255 })
        .withMessage('Title must not exceed 255 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    (0, express_validator_1.body)('type')
        .optional()
        .isIn(Object.values(types_1.ResourceType))
        .withMessage('Type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
    (0, express_validator_1.body)('url')
        .optional()
        .trim()
        .isURL()
        .withMessage('URL must be a valid URL'),
];
const resourceTypeValidation = [
    (0, express_validator_1.param)('type')
        .isIn(Object.values(types_1.ResourceType))
        .withMessage('Type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
];
const searchValidation = [
    (0, express_validator_1.query)('q')
        .trim()
        .notEmpty()
        .withMessage('Search query is required')
        .isLength({ min: 2 })
        .withMessage('Search query must be at least 2 characters'),
    (0, express_validator_1.query)('type')
        .optional()
        .isIn(Object.values(types_1.ResourceType))
        .withMessage('Type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
    (0, express_validator_1.query)('lessonId')
        .optional()
        .isUUID()
        .withMessage('Lesson ID must be a valid UUID'),
];
const bulkCreateValidation = [
    (0, express_validator_1.body)('resources')
        .isArray({ min: 1 })
        .withMessage('Resources must be an array with at least one item'),
    (0, express_validator_1.body)('resources.*.title')
        .trim()
        .notEmpty()
        .withMessage('Each resource title is required')
        .isLength({ max: 255 })
        .withMessage('Each resource title must not exceed 255 characters'),
    (0, express_validator_1.body)('resources.*.description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Each resource description must not exceed 1000 characters'),
    (0, express_validator_1.body)('resources.*.type')
        .isIn(Object.values(types_1.ResourceType))
        .withMessage('Each resource type must be one of: DOCUMENT, VIDEO, LINK, FILE'),
    (0, express_validator_1.body)('resources.*.url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Each resource URL must be a valid URL'),
];
router.get('/lesson/:lessonId', lessonIdValidation, validate_1.validate, auth_1.optionalAuth, resource_controller_1.ResourceController.getResourcesByLesson);
router.get('/:resourceId', resourceIdValidation, validate_1.validate, auth_1.optionalAuth, resource_controller_1.ResourceController.getResourceById);
router.get('/type/:type', resourceTypeValidation, validate_1.validate, auth_1.optionalAuth, resource_controller_1.ResourceController.getResourcesByType);
router.get('/search', searchValidation, validate_1.validate, auth_1.optionalAuth, resource_controller_1.ResourceController.searchResources);
router.post('/', createResourceValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, resource_controller_1.ResourceController.createResource);
router.put('/:resourceId', resourceIdValidation, updateResourceValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, resource_controller_1.ResourceController.updateResource);
router.delete('/:resourceId', resourceIdValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, resource_controller_1.ResourceController.deleteResource);
router.post('/lesson/:lessonId/bulk', lessonIdValidation, bulkCreateValidation, validate_1.validate, auth_1.checkAuth, auth_1.checkAdmin, resource_controller_1.ResourceController.bulkCreateResources);
exports.default = router;
//# sourceMappingURL=resource.routes.js.map