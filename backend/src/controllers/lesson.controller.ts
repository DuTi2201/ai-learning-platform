import { Request, Response } from 'express';
import { LessonService } from '../services/lesson.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, CreateLessonRequest, UpdateLessonRequest, LessonStatus } from '../types';

export class LessonController {
  // Get all lessons (Admin only)
  static getAllLessons = asyncHandler(async (req: Request, res: Response) => {
    const lessons = await LessonService.getAllLessons();

    const response: ApiResponse = {
      success: true,
      message: 'All lessons retrieved successfully',
      data: lessons,
    };

    res.json(response);
  });

  // Get recent lessons (Admin only)
  static getRecentLessons = asyncHandler(async (req: Request, res: Response) => {
    const lessons = await LessonService.getRecentLessons();

    const response: ApiResponse = {
      success: true,
      message: 'Recent lessons retrieved successfully',
      data: lessons,
    };

    res.json(response);
  });

  // Get all lessons for a module
  static getLessonsByModule = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const userId = req.user?.id;
    
    const lessons = await LessonService.getLessonsByModule(moduleId, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Lessons retrieved successfully',
      data: lessons,
    };

    res.json(response);
  });

  // Get lesson by ID
  static getLessonById = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const userId = req.user?.id;
    
    const lesson = await LessonService.getLessonById(lessonId, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson retrieved successfully',
      data: lesson,
    };

    res.json(response);
  });

  // Create new lesson (Admin only)
  static createLesson = asyncHandler(async (req: Request, res: Response) => {
    const lessonData: CreateLessonRequest = req.body;

    const lesson = await LessonService.createLesson(lessonData);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson created successfully',
      data: lesson,
    };

    res.status(201).json(response);
  });

  // Update lesson (Admin only)
  static updateLesson = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const updateData: UpdateLessonRequest = req.body;

    const lesson = await LessonService.updateLesson(lessonId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson updated successfully',
      data: lesson,
    };

    res.json(response);
  });

  // Delete lesson (Admin only)
  static deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    await LessonService.deleteLesson(lessonId);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson deleted successfully',
    };

    res.json(response);
  });

  // Update lesson progress
  static updateLessonProgress = asyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;

    const progress = await LessonService.updateLessonProgress(userId, lessonId, status);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson progress updated successfully',
      data: progress,
    };

    res.json(response);
  });

  // Get user's lesson progress for a course
  static getUserLessonProgress = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const progress = await LessonService.getUserLessonProgress(userId, courseId);

    const response: ApiResponse = {
      success: true,
      message: 'Lesson progress retrieved successfully',
      data: progress,
    };

    res.json(response);
  });

  // Reorder lessons (Admin only)
  static reorderLessons = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const { lessonOrders } = req.body;

    await LessonService.reorderLessons(moduleId, lessonOrders);

    const response: ApiResponse = {
      success: true,
      message: 'Lessons reordered successfully',
    };

    res.json(response);
  });
}