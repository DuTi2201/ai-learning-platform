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
  DOCUMENT = 'DOCUMENT',
  LINK = 'LINK',
}

export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
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
  description: string;
  thumbnailUrl?: string;
  instructorId: string;
  instructor?: User;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  modules?: Module[];
  enrollments?: Enrollment[];
}

export interface Module {
  id: string;
  courseId: string;
  course?: Course;
  title: string;
  description?: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  module?: Module;
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  orderIndex: number;
  duration?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  resources?: Resource[];
  progress?: LessonProgress[];
}

export interface Resource {
  id: string;
  lessonId: string;
  lesson?: Lesson;
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
  fileSize?: number; // in bytes
  createdAt: Date;
  updatedAt: Date;
}

// Progress tracking types
export interface Enrollment {
  id: string;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  enrolledAt: Date;
  completedAt?: Date;
  progress?: number; // percentage 0-100
}

export interface LessonProgress {
  id: string;
  userId: string;
  user?: User;
  lessonId: string;
  lesson?: Lesson;
  status: LessonStatus;
  completedAt?: Date;
  timeSpent?: number; // in minutes
  lastAccessedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  details?: any;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface CourseFormData {
  courseCode: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

export interface ModuleFormData {
  title: string;
  description?: string;
  orderIndex: number;
}

export interface LessonFormData {
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  orderIndex: number;
  duration?: number;
}

export interface ResourceFormData {
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
}

// Component props types
export interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  showEnrollButton?: boolean;
}

export interface ModuleCardProps {
  module: Module;
  onClick?: (moduleId: string) => void;
}

export interface LessonCardProps {
  lesson: Lesson;
  progress?: LessonProgress;
  onClick?: (lessonId: string) => void;
}

// Auth types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Query params
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
