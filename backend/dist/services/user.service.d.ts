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
        googleId: string;
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
    static updateUserRole(userId: string, role: UserRole): Promise<{
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: import("@/generated/prisma").$Enums.UserRole;
        createdAt: Date;
    }>;
    static deleteUser(userId: string): Promise<{
        message: string;
    }>;
    static getUserProgress(userId: string): Promise<({
        lesson: {
            id: string;
            title: string;
            module: {
                id: string;
                course: {
                    id: string;
                    courseCode: string;
                    title: string;
                };
                title: string;
                moduleOrder: number;
            };
            lessonOrder: number;
        };
    } & {
        id: string;
        userId: string;
        status: import("@/generated/prisma").$Enums.LessonStatus;
        lessonId: string;
        completedAt: Date | null;
    })[]>;
    static getUserEnrolledCourses(userId: string): Promise<{
        course: {
            modules: undefined;
            id: string;
            courseCode: string;
            title: string;
            description: string | null;
        };
        progress: {
            totalLessons: number;
            completedLessons: number;
            progressPercentage: number;
        };
        id: string;
        userId: string;
        courseId: string;
        enrollmentDate: Date;
    }[]>;
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
}
//# sourceMappingURL=user.service.d.ts.map