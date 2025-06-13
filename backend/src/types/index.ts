import { Request } from 'express';

// Enums
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export enum ResourceType {
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  SLIDES = 'SLIDES',
  ASSIGNMENT = 'ASSIGNMENT',
  QUIZ = 'QUIZ',
}

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// Generic types
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Auth types
export interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

// Course types
export interface CreateCourseRequest {
  courseCode: string;
  title: string;
  description?: string;
  instructorId: string;
  tags?: string[];
  coverImageUrl?: string;
}

export interface UpdateCourseRequest {
  courseCode?: string;
  title?: string;
  description?: string;
  instructorId?: string;
  tags?: string[];
  coverImageUrl?: string;
}

export interface CourseResponse {
  id: string;
  courseCode: string;
  title: string;
  description: string | null;
  tags: string[];
  coverImageUrl: string | null;
  instructor: {
    id: string;
    fullName: string;
  };
  modules: ModuleResponse[];
}

// Module types
export interface CreateModuleRequest {
  title: string;
  description?: string;
  courseId: string;
  order: number;
}

export interface UpdateModuleRequest {
  title?: string;
  description?: string;
  order?: number;
}

export interface ModuleResponse {
  id: string;
  title: string;
  description: string | null;
  order: number;
  lessons: LessonResponse[];
}

// Lesson types
export interface CreateLessonRequest {
  title: string;
  content?: string;
  moduleId: string;
  order: number;
  estimatedDuration?: number; // in minutes
}

export interface UpdateLessonRequest {
  title?: string;
  content?: string;
  order?: number;
  estimatedDuration?: number;
}

export interface LessonResponse {
  id: string;
  title: string;
  content: string | null;
  order: number;
  estimatedDuration: number | null;
  resources: ResourceResponse[];
}

// Resource types
export interface CreateResourceRequest {
  resourceType: ResourceType;
  title: string;
  url: string;
  lessonId: string;
  deadline?: string; // ISO 8601 date string
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
}

export interface UpdateInstructorRequest {
  fullName?: string;
  title?: string;
  bio?: string;
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
