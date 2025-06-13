// Auth types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  avatar?: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role?: 'STUDENT' | 'INSTRUCTOR';
}

export interface AuthResponse {
  user: User;
  token: string;
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

// Resource types
export type ResourceType = 'VIDEO' | 'DOCUMENT' | 'LINK' | 'QUIZ';

// Course types
export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description?: string;
  tags?: string[];
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
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration_hours: number;
  price: number;
  thumbnail_url?: string;
}

// Module types
export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface CreateModuleRequest {
  title: string;
  description?: string;
  courseId: string;
  order: number;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  content: string;
  module_id: string;
  instructor_id: string;
  order_index: number;
  created_at: Date;
  updated_at: Date;
  resources?: Resource[];
}

export interface CreateLessonRequest {
  title: string;
  content: string;
  module_id: string;
  instructor_id: string;
  order_index: number;
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
  type: ResourceType;
  title: string;
  url: string;
  description?: string;
  lesson_id: string;
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
  lessonId: string;
  userId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number;
}

// Dashboard types
export interface DashboardStats {
  totalCourses: number;
  totalLessons: number;
  totalStudents: number;
  totalInstructors: number;
}

// Search types
export interface SearchFilters {
  query?: string;
  level?: string;
  tags?: string[];
  instructorId?: string;
  page?: number;
  limit?: number;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: Date;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Form types
export interface FormErrors {
  [key: string]: string;
}

export interface FormState<T> {
  data: T;
  errors: FormErrors;
  loading: boolean;
  submitted: boolean;
}