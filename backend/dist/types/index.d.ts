import { Request } from 'express';
import { UserRole, ResourceType, LessonStatus, EnrollmentType } from '../generated/prisma';
export { UserRole, ResourceType, LessonStatus, EnrollmentType };
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
        hasPrev: boolean;
    };
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
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
export interface CreateCourseRequest {
    title: string;
    description: string;
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
export interface UpdateUserRequest {
    fullName?: string;
    profilePictureUrl?: string;
    role?: UserRole;
    email?: string;
}
export interface AuthenticatedRequest extends Request {
    user?: Express.User;
}
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
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    details?: any;
    constructor(message: string, statusCode: number);
}
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
//# sourceMappingURL=index.d.ts.map