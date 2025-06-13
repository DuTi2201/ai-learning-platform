import { CreateModuleRequest, UpdateModuleRequest, ModuleWithDetails } from '../types';
export declare class ModuleService {
    static getAllModules(): Promise<({
        _count: {
            lessons: number;
        };
        course: {
            id: string;
            title: string;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        courseId: string;
        moduleOrder: number;
    })[]>;
    static getModulesByCourse(courseId: string, userId?: string): Promise<any[]>;
    static getModuleById(moduleId: string, userId?: string): Promise<ModuleWithDetails>;
    static createModule(data: CreateModuleRequest): Promise<{
        _count: {
            lessons: number;
        };
        course: {
            id: string;
            title: string;
            courseCode: string;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        courseId: string;
        moduleOrder: number;
    }>;
    static updateModule(moduleId: string, data: UpdateModuleRequest): Promise<{
        _count: {
            lessons: number;
        };
        course: {
            id: string;
            title: string;
            courseCode: string;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        courseId: string;
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