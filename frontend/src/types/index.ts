import React from 'react';

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
  courseCode: string;
  title: string;
  description?: string;
  instructorId: string;
  tags?: string[];
  coverImageUrl?: string;
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
  description?: string;
  content?: string;
  order: number;
  estimatedDuration?: number;
  resources: Resource[];
}

export interface CreateLessonRequest {
  title: string;
  content?: string;
  moduleId: string;
  order: number;
  estimatedDuration?: number;
}

// Resource types
export interface Resource {
  id: string;
  resourceType: ResourceType;
  title: string;
  url: string;
  deadline?: Date;
}

export interface CreateResourceRequest {
  resourceType: ResourceType;
  title: string;
  url: string;
  lessonId: string;
  deadline?: Date;
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
  logout: () => void;
}

// Query params
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}