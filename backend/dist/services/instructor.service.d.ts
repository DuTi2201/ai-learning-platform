import { CreateInstructorRequest, UpdateInstructorRequest, PaginationParams, PaginatedResponse } from '../types';
export declare class InstructorService {
    static getAllInstructors(params: PaginationParams & {
        search?: string;
    }): Promise<PaginatedResponse<any>>;
    static getInstructorById(instructorId: string): Promise<{
        _count: {
            lessons: number;
        };
        lessons: {
            id: string;
            title: string;
            description: string | null;
            module: {
                id: string;
                course: {
                    id: string;
                    courseCode: string;
                    title: string;
                };
                title: string;
            };
            lessonOrder: number;
        }[];
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
    static getInstructorLessons(instructorId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        moduleId: string;
        instructorId: string;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    }[]>;
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
            totalStudents: number;
        };
    }>;
    static searchByExpertise(expertise: string): Promise<{
        id: string;
        fullName: string;
        title: string | null;
        bio: string | null;
    }[]>;
}
//# sourceMappingURL=instructor.service.d.ts.map