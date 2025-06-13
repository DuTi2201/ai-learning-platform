import { CreateModuleRequest, UpdateModuleRequest, ModuleWithDetails } from '../types';
export declare class ModuleService {
    static getModulesByCourse(courseId: string, userId?: string): Promise<{
        lessons: {
            progress: {
                id: string;
                userId: string;
                status: import("@/generated/prisma").$Enums.LessonStatus;
                lessonId: string;
                completedAt: Date | null;
            } | null;
            lessonProgress: undefined;
            _count: {
                resources: number;
            };
            instructor: {
                id: string;
                fullName: string;
                title: string | null;
            };
            id: string;
            title: string;
            description: string | null;
            moduleId: string;
            instructorId: string;
            lessonDate: Date | null;
            zoomInfo: string | null;
            lessonOrder: number;
        }[];
        _count: {
            lessons: number;
        };
        id: string;
        courseId: string;
        title: string;
        description: string | null;
        moduleOrder: number;
    }[]>;
    static getModuleById(moduleId: string, userId?: string): Promise<ModuleWithDetails>;
    static createModule(data: CreateModuleRequest): Promise<{
        _count: {
            lessons: number;
        };
        course: {
            id: string;
            courseCode: string;
            title: string;
        };
    } & {
        id: string;
        courseId: string;
        title: string;
        description: string | null;
        moduleOrder: number;
    }>;
    static updateModule(moduleId: string, data: UpdateModuleRequest): Promise<{
        _count: {
            lessons: number;
        };
        course: {
            id: string;
            courseCode: string;
            title: string;
        };
    } & {
        id: string;
        courseId: string;
        title: string;
        description: string | null;
        moduleOrder: number;
    }>;
    static deleteModule(moduleId: string): Promise<{
        message: string;
    }>;
    static reorderModules(courseId: string, moduleOrders: {
        moduleId: string;
        order: number;
    }[]): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=module.service.d.ts.map