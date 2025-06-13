"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const module_service_1 = require("../services/module.service");
const errorHandler_1 = require("../middlewares/errorHandler");
class ModuleController {
}
exports.ModuleController = ModuleController;
_a = ModuleController;
ModuleController.getModulesByCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    const modules = await module_service_1.ModuleService.getModulesByCourse(courseId, userId);
    const response = {
        success: true,
        message: 'Modules retrieved successfully',
        data: modules,
    };
    res.json(response);
});
ModuleController.getModuleById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { moduleId } = req.params;
    const userId = req.user?.id;
    const module = await module_service_1.ModuleService.getModuleById(moduleId, userId);
    const response = {
        success: true,
        message: 'Module retrieved successfully',
        data: module,
    };
    res.json(response);
});
ModuleController.createModule = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const moduleData = req.body;
    const module = await module_service_1.ModuleService.createModule(moduleData);
    const response = {
        success: true,
        message: 'Module created successfully',
        data: module,
    };
    res.status(201).json(response);
});
ModuleController.updateModule = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { moduleId } = req.params;
    const updateData = req.body;
    const module = await module_service_1.ModuleService.updateModule(moduleId, updateData);
    const response = {
        success: true,
        message: 'Module updated successfully',
        data: module,
    };
    res.json(response);
});
ModuleController.deleteModule = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { moduleId } = req.params;
    await module_service_1.ModuleService.deleteModule(moduleId);
    const response = {
        success: true,
        message: 'Module deleted successfully',
    };
    res.json(response);
});
ModuleController.reorderModules = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const { moduleOrders } = req.body;
    await module_service_1.ModuleService.reorderModules(courseId, moduleOrders);
    const response = {
        success: true,
        message: 'Modules reordered successfully',
    };
    res.json(response);
});
//# sourceMappingURL=module.controller.js.map