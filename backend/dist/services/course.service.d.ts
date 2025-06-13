import { CreateCourseRequest, UpdateCourseRequest, CourseWithDetails, QueryParams } from '../types';
export declare class CourseService {
    static getAllCourses(params: QueryParams, userId?: string): Promise<{
        courses: {
            isEnrolled: boolean;
            enrollments: undefined;
            _count: {
                enrollments: number;
                modules: number;
            };
            createdBy: {
                id: string;
                fullName: string;
            };
            id: string;
            createdAt: Date;
            courseCode: string;
            title: string;
            description: string | null;
            createdById: string;
        }[];
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
        courseCode: string;
        title: string;
        description: string | null;
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
        courseCode: string;
        title: string;
        description: string | null;
        createdById: string;
    }>;
    static deleteCourse(courseId: string): Promise<{
        message: string;
    }>;
    static enrollUser(userId: string, courseId: string): Promise<{
        course: {
            id: string;
            courseCode: string;
            title: string;
            description: string | null;
        };
    } & {
        id: string;
        userId: string;
        courseId: string;
        enrollmentDate: Date;
    }>;
    static unenrollUser(userId: string, courseId: string): Promise<{
        message: string;
    }>;
    static getUserEnrolledCourses(userId: string): Promise<{
        course: {
            isEnrolled: boolean;
            _count: {
                modules: number;
            };
            createdBy: {
                id: string;
                fullName: string;
            };
            id: string;
            createdAt: Date;
            courseCode: string;
            title: string;
            description: string | null;
            createdById: string;
        };
        id: string;
        userId: string;
        courseId: string;
        enrollmentDate: Date;
    }[]>;
}
//# sourceMappingURL=course.service.d.ts.map