import { CreateCourseRequest, UpdateCourseRequest, CourseWithDetails, QueryParams } from '../types';
export declare class CourseService {
    static getAllCourses(params: QueryParams, userId?: string): Promise<{
        courses: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
            totalPages: number;
        };
    }>;
    static getCourseById(courseId: string, userId?: string): Promise<CourseWithDetails>;
    static createCourse(data: CreateCourseRequest, createdById: string): Promise<any>;
    static updateCourse(courseId: string, data: UpdateCourseRequest): Promise<any>;
    static deleteCourse(courseId: string): Promise<{
        message: string;
    }>;
    static enrollUser(userId: string, courseId: string): Promise<any>;
    static unenrollUser(userId: string, courseId: string): Promise<{
        message: string;
    }>;
    static getUserEnrolledCourses(userId: string): Promise<any>;
}
//# sourceMappingURL=course.service.d.ts.map