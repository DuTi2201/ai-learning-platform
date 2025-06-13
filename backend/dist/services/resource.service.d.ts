import { CreateResourceRequest, UpdateResourceRequest, ResourceType } from '../types';
export declare class ResourceService {
    static getResourcesByLesson(lessonId: string): Promise<any>;
    static getResourceById(resourceId: string): Promise<any>;
    static createResource(data: CreateResourceRequest): Promise<any>;
    static updateResource(resourceId: string, data: UpdateResourceRequest): Promise<any>;
    static deleteResource(resourceId: string): Promise<{
        message: string;
    }>;
    static getResourcesByType(type: ResourceType, lessonId?: string): Promise<any>;
    static searchResources(query: string, type?: ResourceType, lessonId?: string): Promise<any>;
    static bulkCreateResources(lessonId: string, resources: Omit<CreateResourceRequest, 'lessonId'>[]): Promise<any>;
}
//# sourceMappingURL=resource.service.d.ts.map