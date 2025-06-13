import { UpdateUserRequest, PaginationParams, PaginatedResponse, UserRole } from '../types';
export declare class UserService {
    static getAllUsers(params: PaginationParams & {
        search?: string;
        role?: UserRole;
    }): Promise<PaginatedResponse<any>>;
    static getUserById(userId: string, includePrivate?: boolean): Promise<any>;
    static getUserByEmail(email: string): Promise<any>;
    static createOrUpdateUser(userData: {
        email: string;
        fullName: string;
        profilePictureUrl?: string;
        googleId: string;
    }): Promise<any>;
    static updateUser(userId: string, data: UpdateUserRequest): Promise<any>;
    static updateUserRole(userId: string, role: UserRole): Promise<any>;
    static deleteUser(userId: string): Promise<{
        message: string;
    }>;
    static getUserProgress(userId: string): Promise<any>;
    static getUserEnrolledCourses(userId: string): Promise<any[]>;
    static getUserStats(userId: string): Promise<{
        user: {
            id: any;
            name: any;
            email: any;
            profilePictureUrl: any;
        };
        stats: {
            totalEnrollments: any;
            completedLessons: any;
            totalLessonsStarted: any;
            completionRate: number;
        };
    }>;
}
//# sourceMappingURL=user.service.d.ts.map