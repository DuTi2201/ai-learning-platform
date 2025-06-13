import { CreateCourseRequest, UpdateCourseRequest, CourseWithDetails, QueryParams } from '../types';
export declare class CourseService {
    static getAllCourses(params: QueryParams, userId?: string): Promise<{
        courses: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    static getCourseById(courseId: string, userId?: string): Promise<CourseWithDetails>;
    static createCourse(data: CreateCourseRequest, createdById: string): Promise<{
        _count: {
            enrollments: number;
            modules: number;
        };
        createdBy: {
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        courseCode: string;
        createdById: string;
    }>;
    static updateCourse(courseId: string, data: UpdateCourseRequest): Promise<{
        _count: {
            enrollments: number;
            modules: number;
        };
        createdBy: {
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        courseCode: string;
        createdById: string;
    }>;
    static deleteCourse(courseId: string): Promise<{
        message: string;
    }>;
    static enrollUser(userId: string, courseId: string): Promise<{
        course: {
            id: string;
            title: string;
            description: string | null;
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
    static unenrollUser(userId: string, courseId: string): Promise<{
        message: string;
    }>;
    static getUserEnrolledCourses(userId: string): Promise<any[]>;
}
//# sourceMappingURL=course.service.d.ts.map