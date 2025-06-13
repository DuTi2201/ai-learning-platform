import { CreateResourceRequest, UpdateResourceRequest, ResourceType } from '../types';
export declare class ResourceService {
    static getResourcesByLesson(lessonId: string): Promise<{
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    }[]>;
    static getResourceById(resourceId: string): Promise<{
        lesson: {
            id: string;
            module: {
                id: string;
                course: {
                    id: string;
                    title: string;
                    courseCode: string;
                };
                title: string;
            };
            title: string;
        };
    } & {
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    }>;
    static createResource(data: CreateResourceRequest): Promise<{
        lesson: {
            id: string;
            title: string;
        };
    } & {
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    }>;
    static updateResource(resourceId: string, data: UpdateResourceRequest): Promise<{
        lesson: {
            id: string;
            title: string;
        };
    } & {
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    }>;
    static deleteResource(resourceId: string): Promise<{
        message: string;
    }>;
    static getResourcesByType(type: ResourceType, lessonId?: string): Promise<({
        lesson: {
            id: string;
            module: {
                id: string;
                course: {
                    id: string;
                    title: string;
                    courseCode: string;
                };
                title: string;
            };
            title: string;
        };
    } & {
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    })[]>;
    static searchResources(query: string, type?: ResourceType, lessonId?: string): Promise<({
        lesson: {
            id: string;
            module: {
                id: string;
                course: {
                    id: string;
                    title: string;
                    courseCode: string;
                };
                title: string;
            };
            title: string;
        };
    } & {
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    })[]>;
    static bulkCreateResources(lessonId: string, resources: Omit<CreateResourceRequest, 'lessonId'>[]): Promise<{
        id: string;
        lessonId: string;
        title: string;
        resourceType: import("@/generated/prisma").$Enums.ResourceType;
        url: string;
        deadline: Date | null;
    }[]>;
}
//# sourceMappingURL=resource.service.d.ts.map