import { UpdateUserRequest, PaginationParams, PaginatedResponse, UserRole } from '../types';
export declare class UserService {
    static getAllUsers(params: PaginationParams & {
        search?: string;
        role?: UserRole;
    }): Promise<PaginatedResponse<any>>;
    static getUserById(userId: string, includePrivate?: boolean): Promise<{
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: import("@/generated/prisma").$Enums.UserRole;
        createdAt: Date;
    }>;
    static getUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: import("@/generated/prisma").$Enums.UserRole;
        createdAt: Date;
    } | null>;
    static createOrUpdateUser(userData: {
        email: string;
        fullName: string;
        profilePictureUrl?: string;
        googleId: string;
    }): Promise<{
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: import("@/generated/prisma").$Enums.UserRole;
        createdAt: Date;
    }>;
    static updateUser(userId: string, data: UpdateUserRequest): Promise<{
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: import("@/generated/prisma").$Enums.UserRole;
        createdAt: Date;
    }>;
    static updateUserRole(userId: string, role: UserRole): Promise<any>;
    static deleteUser(userId: string): Promise<{
        message: string;
    }>;
    static getUserProgress(userId: string): Promise<({
        lesson: {
            id: string;
            module: {
                id: string;
                course: {
                    id: string;
                    title: string;
                    courseCode: string;
                };
                title: string;
                moduleOrder: number;
            };
            title: string;
            lessonOrder: number;
        };
    } & {
        id: string;
        userId: string;
        status: import("@/generated/prisma").$Enums.LessonStatus;
        lessonId: string;
        completedAt: Date | null;
    })[]>;
    static getUserEnrolledCourses(userId: string): Promise<any[]>;
    static getUserStats(userId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            profilePictureUrl: string | null;
        };
        stats: {
            totalEnrollments: number;
            completedLessons: number;
            totalLessonsStarted: number;
            completionRate: number;
        };
    }>;
    static getUsers(params: PaginationParams & {
        search?: string;
        role?: string;
    }): Promise<PaginatedResponse<any>>;
    static getAllInstructors(params: PaginationParams & {
        search?: string;
    }): Promise<PaginatedResponse<any>>;
    static assignCourseToUser(userId: string, courseId: string, adminId: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        course: {
            id: string;
            title: string;
            courseCode: string;
        };
    } & {
        id: string;
        userId: string;
        courseId: string;
        enrollmentDate: Date;
        enrollmentType: import("@/generated/prisma").$Enums.EnrollmentType;
        assignedBy: string | null;
    }>;
    static removeCourseFromUser(userId: string, courseId: string): Promise<void>;
    static getUserAssignedCourses(userId: string): Promise<any[]>;
}
//# sourceMappingURL=user.service.d.ts.map