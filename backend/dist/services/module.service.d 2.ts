import { CreateModuleRequest, UpdateModuleRequest, ModuleWithDetails } from '../types';
export declare class ModuleService {
    static getModulesByCourse(courseId: string, userId?: string): Promise<any>;
    static getModuleById(moduleId: string, userId?: string): Promise<ModuleWithDetails>;
    static createModule(data: CreateModuleRequest): Promise<any>;
    static updateModule(moduleId: string, data: UpdateModuleRequest): Promise<any>;
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