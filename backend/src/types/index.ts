import { Request } from 'express';
import { UserRole, ResourceType, LessonStatus } from '../generated/prisma';

// Re-export enums
export { UserRole, ResourceType, LessonStatus };

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface User {
      id: string;
      googleId: string;
      email: string;
      fullName: string;
      profilePictureUrl: string | null;
      role: UserRole;
      createdAt: Date;
    }
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean; // Added hasPrev
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean; // Added hasPrev
  };
}



// Auth types
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    profilePictureUrl: string | null;
    role: UserRole;
  };
  token: string;
}

// Course types
export interface CreateCourseRequest {
  courseCode: string;
  title: string;
  description?: string;
}

export interface UpdateCourseRequest {
  courseCode?: string;
  title?: string;
  description?: string;
}

export interface CourseWithDetails {
  id: string;
  courseCode: string;
  title: string;
  description: string | null;
  createdAt: Date;
  createdBy: {
    id: string;
    fullName: string;
  };
  modules: ModuleWithLessons[];
  _count: {
    enrollments: number;
  };
}

// Module types
export interface CreateModuleRequest {
  courseId: string;
  title: string;
  description?: string;
  moduleOrder: number;
}

export interface UpdateModuleRequest {
  title?: string;
  description?: string;
  moduleOrder?: number;
}

export interface ModuleWithLessons {
  id: string;
  title: string;
  description: string | null;
  moduleOrder: number;
  lessons: LessonWithResources[];
}

// Lesson types
export interface CreateLessonRequest {
  moduleId: string;
  instructorId: string;
  title: string;
  description?: string;
  lessonDate?: string;
  zoomInfo?: string;
  lessonOrder: number;
}

export interface UpdateLessonRequest {
  instructorId?: string;
  title?: string;
  description?: string;
  lessonDate?: string;
  zoomInfo?: string;
  lessonOrder?: number;
}

export interface LessonWithResources {
  id: string;
  title: string;
  description: string | null;
  lessonDate: Date | null;
  zoomInfo: string | null;
  lessonOrder: number;
  instructor: {
    id: string;
    fullName: string;
    title: string | null;
  };
  resources: ResourceResponse[];
}

export interface LessonWithDetails {
  id: string;
  title: string;
  description: string | null;
  lessonDate: Date | null;
  zoomInfo: string | null;
  lessonOrder: number;
  instructor: {
    id: string;
    fullName: string;
    title: string | null;
  };
  resources: ResourceResponse[];
  module: {
    id: string;
    title: string;
    course: {
      id: string;
      courseCode: string;
      title: string;
    };
  };
}

export interface ModuleWithDetails {
  id: string;
  title: string;
  description: string | null;
  moduleOrder: number;
  course: {
    id: string;
    courseCode: string;
    title: string;
  };
  lessons: LessonWithResources[];
  _count: {
    lessons: number;
  };
}

// Resource types
export interface CreateResourceRequest {
  lessonId: string;
  resourceType: ResourceType;
  title: string;
  url: string;
  deadline?: string;
}

export interface UpdateResourceRequest {
  resourceType?: ResourceType;
  title?: string;
  url?: string;
  deadline?: string;
}

export interface ResourceResponse {
  id: string;
  resourceType: ResourceType;
  title: string;
  url: string;
  deadline: Date | null;
}

// Instructor types
export interface CreateInstructorRequest {
  fullName: string;
  title?: string;
  bio?: string;
  email?: string;
}

export interface UpdateInstructorRequest {
  fullName?: string;
  title?: string;
  bio?: string;
  email?: string;
}

export interface InstructorResponse {
  id: string;
  fullName: string;
  title: string | null;
  bio: string | null;
}

// Enrollment types
export interface EnrollmentRequest {
  courseId: string;
}

export interface EnrollmentResponse {
  id: string;
  enrollmentDate: Date;
  course: {
    id: string;
    courseCode: string;
    title: string;
    description: string | null;
  };
}

// User types
export interface UpdateUserRequest {
  fullName?: string;
  profilePictureUrl?: string;
  role?: UserRole;
  email?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Express.User;
}

// Progress types
export interface UpdateProgressRequest {
  lessonId: string;
  status: LessonStatus;
}

export interface ProgressResponse {
  id: string;
  status: LessonStatus;
  completedAt: Date | null;
  lesson: {
    id: string;
    title: string;
  };
}

// Error types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Utility types
export interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}
