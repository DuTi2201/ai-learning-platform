// User related types
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export type ResourceType = 'VIDEO' | 'DOCUMENT' | 'LINK' | 'EXERCISE' | 'QUIZ';

export type LessonStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// Course related types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  instructorId: string;
}

// Module related types
export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModuleRequest {
  title: string;
  description: string;
  courseId: string;
  orderIndex: number;
}

// Lesson related types
export interface Lesson {
  id: string;
  title: string;
  content: string;
  module_id: string;
  instructor_id: string;
  order_index: number;
  status?: LessonStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLessonRequest {
  title: string;
  content: string;
  module_id: string;
  instructor_id: string;
  order_index: number;
  status?: LessonStatus;
}

// Resource related types
export interface Resource {
  id: string;
  title: string;
  resourceType: ResourceType;
  url: string;
  description?: string;
  lessonId: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceRequest {
  title: string;
  resourceType: ResourceType;
  url: string;
  description?: string;
  lessonId: string;
}

// Instructor related types
export interface Instructor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enrollment related types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
}

// Progress related types
export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Theme related types
export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Auth related types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// Query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}