import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiResponse, UpdateUserRequest, UserRole, AuthenticatedRequest } from '../types';

export class UserController {
  // Get all users with pagination and search (Admin only)
  static getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search, role } = req.query;
    
    const result = await UserService.getAllUsers({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      search: search as string,
      role: role as UserRole,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Users retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };

    res.json(response);
  });

  // Get current user profile
  static getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    
    const user = await UserService.getUserById(userId, true); // Include private data

    const response: ApiResponse = {
      success: true,
      message: 'Current user retrieved successfully',
      data: user,
    };

    res.json(response);
  });

  // Get user by ID
  static getUserById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user?.id;
    const isAdmin = req.user?.role === UserRole.ADMIN;
    
    // Include private data only if it's the user's own profile or admin
    const includePrivate = currentUserId === userId || isAdmin;
    
    const user = await UserService.getUserById(userId, includePrivate);

    const response: ApiResponse = {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };

    res.json(response);
  });

  // Update current user profile
  static updateCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const updateData: UpdateUserRequest = req.body;

    // Remove role from update data for non-admin users
    if (req.user!.role !== UserRole.ADMIN) {
      delete updateData.role;
    }

    const user = await UserService.updateUser(userId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Profile updated successfully',
      data: user,
    };

    res.json(response);
  });

  // Update user profile (Admin only)
  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updateData: UpdateUserRequest = req.body;

    const user = await UserService.updateUser(userId, updateData);

    const response: ApiResponse = {
      success: true,
      message: 'User updated successfully',
      data: user,
    };

    res.json(response);
  });

  // Update user role (Admin only)
  static updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await UserService.updateUserRole(userId, role);

    const response: ApiResponse = {
      success: true,
      message: 'User role updated successfully',
      data: user,
    };

    res.json(response);
  });

  // Delete user (Admin only)
  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    await UserService.deleteUser(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User deleted successfully',
    };

    res.json(response);
  });

  // Get current user's learning progress
  static getCurrentUserProgress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    
    const progress = await UserService.getUserProgress(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User progress retrieved successfully',
      data: progress,
    };

    return res.json(response);
  });

  // Get user's learning progress (Admin or own profile)
  static getUserProgress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;
    const isAdmin = req.user!.role === UserRole.ADMIN;

    // Check if user can access this progress
    if (currentUserId !== userId && !isAdmin) {
      const response: ApiResponse = {
        success: false,
        message: 'Access denied. You can only view your own progress.',
      };
      return res.status(403).json(response);
    }
    
    const progress = await UserService.getUserProgress(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User progress retrieved successfully',
      data: progress,
    };

    return res.json(response);
  });

  // Get current user's enrolled courses
  static getCurrentUserCourses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    
    const courses = await UserService.getUserEnrolledCourses(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User enrolled courses retrieved successfully',
      data: courses,
    };

    return res.json(response);
  });

  // Get user's enrolled courses (Admin or own profile)
  static getUserCourses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;
    const isAdmin = req.user!.role === UserRole.ADMIN;

    // Check if user can access this data
    if (currentUserId !== userId && !isAdmin) {
      const response: ApiResponse = {
        success: false,
        message: 'Access denied. You can only view your own courses.',
      };
      return res.status(403).json(response);
    }
    
    const courses = await UserService.getUserEnrolledCourses(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User enrolled courses retrieved successfully',
      data: courses,
    };

    return res.json(response);
  });

  // Get current user statistics
  static getCurrentUserStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    
    const stats = await UserService.getUserStats(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User statistics retrieved successfully',
      data: stats,
    };

    return res.json(response);
  });

  // Get user statistics (Admin or own profile)
  static getUserStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;
    const isAdmin = req.user!.role === UserRole.ADMIN;

    // Check if user can access this data
    if (currentUserId !== userId && !isAdmin) {
      const response: ApiResponse = {
        success: false,
        message: 'Access denied. You can only view your own statistics.',
      };
      return res.status(403).json(response);
    }
    
    const stats = await UserService.getUserStats(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User statistics retrieved successfully',
      data: stats,
    };

    return res.json(response);
  });

  // Get all users (Admin only)
  static getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search, role } = req.query;
    
    const result = await UserService.getAllUsers({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      search: search as string,
      role: role as string,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Users retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };

    res.json(response);
  });

  // Get all instructors (Admin only)
  static getAllInstructors = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query;
    
    const result = await UserService.getAllInstructors({
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

  // Assign course to user (Admin only)
  static assignCourseToUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId, courseId } = req.body;
    const adminId = req.user!.id;

    const enrollment = await UserService.assignCourseToUser(userId, courseId, adminId);

    const response: ApiResponse = {
      success: true,
      message: 'Course assigned to user successfully',
      data: enrollment,
    };

    res.json(response);
  });

  // Remove course assignment from user (Admin only)
  static removeCourseFromUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId, courseId } = req.params;

    await UserService.removeCourseFromUser(userId, courseId);

    const response: ApiResponse = {
      success: true,
      message: 'Course assignment removed successfully',
    };

    res.json(response);
  });

  // Get user's assigned courses (different from enrolled courses)
  static getUserAssignedCourses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user!.id;
    const isAdmin = req.user!.role === UserRole.ADMIN;

    // Check if user can access this data
    if (currentUserId !== userId && !isAdmin) {
      const response: ApiResponse = {
        success: false,
        message: 'Access denied. You can only view your own assigned courses.',
      };
      return res.status(403).json(response);
    }
    
    const courses = await UserService.getUserAssignedCourses(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User assigned courses retrieved successfully',
      data: courses,
    };

    return res.json(response);
  });
}