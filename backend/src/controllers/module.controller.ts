import { Request, Response } from 'express';
import { ModuleService } from '../services/module.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, CreateModuleRequest, UpdateModuleRequest } from '../types';

export class ModuleController {
  // Get all modules for a course
  static getModulesByCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    
    const modules = await ModuleService.getModulesByCourse(courseId, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Modules retrieved successfully',
      data: modules,
    };

    res.json(response);
  });

  // Get module by ID
  static getModuleById = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const userId = req.user?.id;
    
    const module = await ModuleService.getModuleById(moduleId, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Module retrieved successfully',
      data: module,
    };

    res.json(response);
  });

  // Create new module (Admin only)
  static createModule = asyncHandler(async (req: Request, res: Response) => {
    const moduleData: CreateModuleRequest = req.body;

    const module = await ModuleService.createModule(moduleData);

    const response: ApiResponse = {
      success: true,
      message: 'Module created successfully',
      data: module,
    };

    res.status(201).json(response);
  });

  // Update module (Admin only)
  static updateModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const updateData: UpdateModuleRequest = req.body;

    const module = await ModuleService.updateModule(moduleId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Module updated successfully',
      data: module,
    };

    res.json(response);
  });

  // Delete module (Admin only)
  static deleteModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    await ModuleService.deleteModule(moduleId);

    const response: ApiResponse = {
      success: true,
      message: 'Module deleted successfully',
    };

    res.json(response);
  });

  // Reorder modules (Admin only)
  static reorderModules = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { moduleOrders } = req.body;

    await ModuleService.reorderModules(courseId, moduleOrders);

    const response: ApiResponse = {
      success: true,
      message: 'Modules reordered successfully',
    };

    res.json(response);
  });
}