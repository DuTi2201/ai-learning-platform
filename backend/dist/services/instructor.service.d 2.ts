import { CreateInstructorRequest, UpdateInstructorRequest, PaginationParams, PaginatedResponse } from '../types';
export declare class InstructorService {
    static getAllInstructors(params: PaginationParams & {
        search?: string;
    }): Promise<PaginatedResponse<any>>;
    static getInstructorById(instructorId: string): Promise<any>;
    static createInstructor(data: CreateInstructorRequest): Promise<any>;
    static updateInstructor(instructorId: string, data: UpdateInstructorRequest): Promise<any>;
    static deleteInstructor(instructorId: string): Promise<{
        message: string;
    }>;
    static getInstructorLessons(instructorId: string): Promise<any>;
    static getInstructorStats(instructorId: string): Promise<{
        instructor: any;
        stats: {
            totalLessons: any;
            totalCourses: any;
            totalStudents: any;
        };
    }>;
}
//# sourceMappingURL=instructor.service.d.ts.map