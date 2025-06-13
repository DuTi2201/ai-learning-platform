import { CreateInstructorRequest, UpdateInstructorRequest, PaginationParams, PaginatedResponse } from '../types';
export declare class InstructorService {
    static getAllInstructors(params: PaginationParams & {
        search?: string;
    }): Promise<PaginatedResponse<any>>;
    static getInstructorById(instructorId: string): Promise<{
        lessons: ({
            module: {
                course: {
                    id: string;
                    createdAt: Date;
                    title: string;
                    description: string | null;
                    courseCode: string;
                    createdById: string;
                };
            } & {
                id: string;
                title: string;
                description: string | null;
                courseId: string;
                moduleOrder: number;
            };
        } & {
            id: string;
            moduleId: string;
            instructorId: string;
            title: string;
            description: string | null;
            lessonDate: Date | null;
            zoomInfo: string | null;
            lessonOrder: number;
        })[];
    } & {
        id: string;
        fullName: string;
        title: string | null;
        bio: string | null;
    }>;
    static createInstructor(data: CreateInstructorRequest): Promise<{
        _count: {
            lessons: number;
        };
    } & {
        id: string;
        fullName: string;
        title: string | null;
        bio: string | null;
    }>;
    static updateInstructor(instructorId: string, data: UpdateInstructorRequest): Promise<{
        _count: {
            lessons: number;
        };
    } & {
        id: string;
        fullName: string;
        title: string | null;
        bio: string | null;
    }>;
    static deleteInstructor(instructorId: string): Promise<{
        message: string;
    }>;
    static getInstructorLessons(instructorId: string): Promise<({
        _count: {
            resources: number;
        };
        module: {
            course: {
                id: string;
                createdAt: Date;
                title: string;
                description: string | null;
                courseCode: string;
                createdById: string;
            };
        } & {
            id: string;
            title: string;
            description: string | null;
            courseId: string;
            moduleOrder: number;
        };
    } & {
        id: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    })[]>;
    static getInstructorStats(instructorId: string): Promise<{
        instructor: {
            id: string;
            fullName: string;
            title: string | null;
            bio: string | null;
        };
        stats: {
            totalLessons: number;
            totalCourses: number;
            totalStudents: any;
        };
    }>;
}
//# sourceMappingURL=instructor.service.d.ts.map