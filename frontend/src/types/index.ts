// Enums
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export enum ResourceType {
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  LINK = 'LINK',
  EXERCISE = 'EXERCISE',
  QUIZ = 'QUIZ',
}

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum LessonType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  QUIZ = 'QUIZ',
  EXERCISE = 'EXERCISE',
}

// User types
export interface User {
  id: string;
  googleId: string;
  email: string;
  fullName: string;
  profilePictureUrl?: string;
  role: UserRole;
  createdAt: Date;
}

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

// Course types
export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description?: string;
  tags: string[];
  coverImageUrl?: string;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration?: string;
  instructor: {
    id: string;
    fullName: string;
  };
  modules: Module[];
  createdAt: Date;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
}

// Module types
export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  courseId: string;
  moduleOrder: number;
  lessons: Lesson[];
}

export interface CreateModuleRequest {
  title: string;
  description?: string;
  courseId: string;
  moduleOrder: number;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  content: string;
  module_id: string;
  moduleId: string; // Alias for module_id
  instructor_id: string;
  order_index: number;
  lessonOrder: number; // Alias for order_index
  lessonType: LessonType;
  created_at: Date;
  updated_at: Date;
  resources?: Resource[];
}

export interface CreateLessonRequest {
  moduleId: string;
  instructorId: string;
  title: string;
  description?: string;
  lessonDate?: string;
  zoomInfo?: string;
  lessonOrder: number;
}

// Resource types
export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  url: string;
  description?: string;
  lesson_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceRequest {
  resourceType: ResourceType;
  title: string;
  url: string;
  description?: string;
  lessonId: string;
}

// Instructor types
export interface Instructor {
  id: string;
  fullName: string;
  title?: string;
  bio?: string;
}

// Enrollment types
export interface Enrollment {
  id: string;
  enrollmentDate: Date;
  course: {
    id: string;
    courseCode: string;
    title: string;
    description?: string;
  };
}

// Progress types
export interface Progress {
  id: string;
  status: LessonStatus;
  completedAt?: Date;
  lesson: {
    id: string;
    title: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

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

// Theme types
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Auth types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<User | null>;
}

// Query params
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}