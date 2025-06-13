// User types
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export type ResourceType = 'DOCUMENT' | 'VIDEO' | 'LINK' | 'QUIZ';

export type LessonStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePictureUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  instructorId: string;
  instructor?: User;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  modules?: Module[];
  _count?: {
    modules: number;
    enrollments: number;
  };
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  thumbnailUrl?: string;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
}

// Module types
export interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  courseId: string;
  course?: Course;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[];
  _count?: {
    lessons: number;
  };
}

export interface CreateModuleRequest {
  title: string;
  description: string;
  orderIndex: number;
  courseId: string;
}

export interface UpdateModuleRequest {
  title?: string;
  description?: string;
  orderIndex?: number;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
  moduleId: string;
  module?: Module;
  createdAt: string;
  updatedAt: string;
  resources?: Resource[];
  _count?: {
    resources: number;
  };
}

export interface CreateLessonRequest {
  title: string;
  content: string;
  orderIndex: number;
  moduleId: string;
}

export interface UpdateLessonRequest {
  title?: string;
  content?: string;
  orderIndex?: number;
}

// Resource types
export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  url: string;
  description?: string;
  lessonId: string;
  lesson?: Lesson;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceRequest {
  type: ResourceType;
  title: string;
  url: string;
  description?: string;
  lesson_id: string;
}

export interface UpdateResourceRequest {
  type?: ResourceType;
  title?: string;
  url?: string;
  description?: string;
}

// Enrollment types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  user?: User;
  course?: Course;
  enrolledAt: string;
  progress?: LessonProgress[];
}

export interface CreateEnrollmentRequest {
  courseId: string;
}

// Progress types
export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: LessonStatus;
  completedAt?: string;
  user?: User;
  lesson?: Lesson;
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
