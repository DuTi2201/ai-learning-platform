import { Request, Response } from 'express';
import { InstructorService } from '../services/instructor.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, CreateInstructorRequest, UpdateInstructorRequest } from '../types';

export class InstructorController {
  // Get all instructors with pagination and search
  static getAllInstructors = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query;
    
    const result = await InstructorService.getAllInstructors({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      search: search as string,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Instructors retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };

    res.json(response);
  });

  // Get instructor by ID
  static getInstructorById = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    
    const instructor = await InstructorService.getInstructorById(instructorId);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor retrieved successfully',
      data: instructor,
    };

    res.json(response);
  });

  // Create new instructor (Admin only)
  static createInstructor = asyncHandler(async (req: Request, res: Response) => {
    const instructorData: CreateInstructorRequest = req.body;

    const instructor = await InstructorService.createInstructor(instructorData);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor created successfully',
      data: instructor,
    };

    res.status(201).json(response);
  });

  // Update instructor (Admin only)
  static updateInstructor = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    const updateData: UpdateInstructorRequest = req.body;

    const instructor = await InstructorService.updateInstructor(instructorId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor updated successfully',
      data: instructor,
    };

    res.json(response);
  });

  // Delete instructor (Admin only)
  static deleteInstructor = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId } = req.params;

    await InstructorService.deleteInstructor(instructorId);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor deleted successfully',
    };

    res.json(response);
  });

  // Get instructor's lessons
  static getInstructorLessons = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    
    const lessons = await InstructorService.getInstructorLessons(instructorId);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor lessons retrieved successfully',
      data: lessons,
    };

    res.json(response);
  });

  // Get instructor statistics
  static getInstructorStats = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    
    const stats = await InstructorService.getInstructorStats(instructorId);

    const response: ApiResponse = {
      success: true,
      message: 'Instructor statistics retrieved successfully',
      data: stats,
    };

    res.json(response);
  });

}