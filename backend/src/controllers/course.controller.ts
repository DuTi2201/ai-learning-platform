import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, CreateCourseRequest, UpdateCourseRequest } from '../types';

export class CourseController {
  // Get all courses
  static getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await CourseService.getAllCourses(req.query, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Courses retrieved successfully',
      data: result.courses,
      pagination: {
        ...result.pagination,
        hasNext: result.pagination.page < result.pagination.totalPages
      },
    };

    res.json(response);
  });

  // Get course by ID
  static getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    
    const course = await CourseService.getCourseById(courseId, userId);

    const response: ApiResponse = {
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    };

    res.json(response);
  });

  // Create new course (Admin only)
  static createCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseData: CreateCourseRequest = req.body;
    const createdById = req.user!.id;

    const course = await CourseService.createCourse(courseData, createdById);

    const response: ApiResponse = {
      success: true,
      message: 'Course created successfully',
      data: course,
    };

    res.status(201).json(response);
  });

  // Update course (Admin only)
  static updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const updateData: UpdateCourseRequest = req.body;

    const course = await CourseService.updateCourse(courseId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Course updated successfully',
      data: course,
    };

    res.json(response);
  });

  // Delete course (Admin only)
  static deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    await CourseService.deleteCourse(courseId);

    const response: ApiResponse = {
      success: true,
      message: 'Course deleted successfully',
    };

    res.json(response);
  });

  // Enroll in course
  static enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const enrollment = await CourseService.enrollUser(userId, courseId);

    const response: ApiResponse = {
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment,
    };

    res.status(201).json(response);
  });

  // Unenroll from course
  static unenrollFromCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.user!.id;

    await CourseService.unenrollUser(userId, courseId);

    const response: ApiResponse = {
      success: true,
      message: 'Successfully unenrolled from course',
    };

    res.json(response);
  });

  // Get user's enrolled courses
  static getMyEnrolledCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const enrollments = await CourseService.getUserEnrolledCourses(userId);

    const response: ApiResponse = {
      success: true,
      message: 'Enrolled courses retrieved successfully',
      data: enrollments,
    };

    res.json(response);
  });
}