import { Request, Response } from 'express';
import { ResourceService } from '../services/resource.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, CreateResourceRequest, UpdateResourceRequest, ResourceType } from '../types';

export class ResourceController {
  // Get all resources
  static getAllResources = asyncHandler(async (req: Request, res: Response) => {
    const resources = await ResourceService.getAllResources();

    const response: ApiResponse = {
      success: true,
      message: 'Resources retrieved successfully',
      data: resources,
    };

    res.json(response);
  });

  // Get all resources for a lesson
  static getResourcesByLesson = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    
    const resources = await ResourceService.getResourcesByLesson(lessonId);

    const response: ApiResponse = {
      success: true,
      message: 'Resources retrieved successfully',
      data: resources,
    };

    res.json(response);
  });

  // Get resource by ID
  static getResourceById = asyncHandler(async (req: Request, res: Response) => {
    const { resourceId } = req.params;
    
    const resource = await ResourceService.getResourceById(resourceId);

    const response: ApiResponse = {
      success: true,
      message: 'Resource retrieved successfully',
      data: resource,
    };

    res.json(response);
  });

  // Create new resource (Admin only)
  static createResource = asyncHandler(async (req: Request, res: Response) => {
    const resourceData: CreateResourceRequest = req.body;

    const resource = await ResourceService.createResource(resourceData);

    const response: ApiResponse = {
      success: true,
      message: 'Resource created successfully',
      data: resource,
    };

    res.status(201).json(response);
  });

  // Update resource (Admin only)
  static updateResource = asyncHandler(async (req: Request, res: Response) => {
    const { resourceId } = req.params;
    const updateData: UpdateResourceRequest = req.body;

    const resource = await ResourceService.updateResource(resourceId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Resource updated successfully',
      data: resource,
    };

    res.json(response);
  });

  // Delete resource (Admin only)
  static deleteResource = asyncHandler(async (req: Request, res: Response) => {
    const { resourceId } = req.params;

    await ResourceService.deleteResource(resourceId);

    const response: ApiResponse = {
      success: true,
      message: 'Resource deleted successfully',
    };

    res.json(response);
  });

  // Get resources by type
  static getResourcesByType = asyncHandler(async (req: Request, res: Response) => {
    const { type } = req.params;
    const { lessonId } = req.query;

    const resources = await ResourceService.getResourcesByType(
      type as ResourceType,
      lessonId as string
    );

    const response: ApiResponse = {
      success: true,
      message: 'Resources retrieved successfully',
      data: resources,
    };

    res.json(response);
  });

  // Search resources
  static searchResources = asyncHandler(async (req: Request, res: Response) => {
    const { q: query, type, lessonId } = req.query;

    if (!query) {
      const response: ApiResponse = {
        success: false,
        message: 'Search query is required',
      };
      return res.status(400).json(response);
    }

    const resources = await ResourceService.searchResources(
      query as string,
      type as ResourceType,
      lessonId as string
    );

    const response: ApiResponse = {
      success: true,
      message: 'Resources search completed successfully',
      data: resources,
    };

    return res.json(response);
  });

  // Bulk create resources (Admin only)
  static bulkCreateResources = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const { resources } = req.body;

    if (!Array.isArray(resources) || resources.length === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Resources array is required and must not be empty',
      };
      return res.status(400).json(response);
    }

    const createdResources = await ResourceService.bulkCreateResources(lessonId, resources);

    const response: ApiResponse = {
      success: true,
      message: 'Resources created successfully',
      data: createdResources,
    };

    return res.status(201).json(response);
  });
}