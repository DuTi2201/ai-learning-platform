"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const resource_service_1 = require("../services/resource.service");
const errorHandler_1 = require("../middlewares/errorHandler");
class ResourceController {
}
exports.ResourceController = ResourceController;
_a = ResourceController;
ResourceController.getResourcesByLesson = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const resources = await resource_service_1.ResourceService.getResourcesByLesson(lessonId);
    const response = {
        success: true,
        message: 'Resources retrieved successfully',
        data: resources,
    };
    res.json(response);
});
ResourceController.getResourceById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { resourceId } = req.params;
    const resource = await resource_service_1.ResourceService.getResourceById(resourceId);
    const response = {
        success: true,
        message: 'Resource retrieved successfully',
        data: resource,
    };
    res.json(response);
});
ResourceController.createResource = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const resourceData = req.body;
    const resource = await resource_service_1.ResourceService.createResource(resourceData);
    const response = {
        success: true,
        message: 'Resource created successfully',
        data: resource,
    };
    res.status(201).json(response);
});
ResourceController.updateResource = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { resourceId } = req.params;
    const updateData = req.body;
    const resource = await resource_service_1.ResourceService.updateResource(resourceId, updateData);
    const response = {
        success: true,
        message: 'Resource updated successfully',
        data: resource,
    };
    res.json(response);
});
ResourceController.deleteResource = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { resourceId } = req.params;
    await resource_service_1.ResourceService.deleteResource(resourceId);
    const response = {
        success: true,
        message: 'Resource deleted successfully',
    };
    res.json(response);
});
ResourceController.getResourcesByType = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { type } = req.params;
    const { lessonId } = req.query;
    const resources = await resource_service_1.ResourceService.getResourcesByType(type, lessonId);
    const response = {
        success: true,
        message: 'Resources retrieved successfully',
        data: resources,
    };
    res.json(response);
});
ResourceController.searchResources = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { q: query, type, lessonId } = req.query;
    if (!query) {
        const response = {
            success: false,
            message: 'Search query is required',
        };
        return res.status(400).json(response);
    }
    const resources = await resource_service_1.ResourceService.searchResources(query, type, lessonId);
    const response = {
        success: true,
        message: 'Resources search completed successfully',
        data: resources,
    };
    return res.json(response);
});
ResourceController.bulkCreateResources = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const { resources } = req.body;
    if (!Array.isArray(resources) || resources.length === 0) {
        const response = {
            success: false,
            message: 'Resources array is required and must not be empty',
        };
        return res.status(400).json(response);
    }
    const createdResources = await resource_service_1.ResourceService.bulkCreateResources(lessonId, resources);
    const response = {
        success: true,
        message: 'Resources created successfully',
        data: createdResources,
    };
    return res.status(201).json(response);
});
//# sourceMappingURL=resource.controller.js.map