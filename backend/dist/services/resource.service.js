"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
const types_2 = require("../types");
class ResourceService {
    static async getResourcesByLesson(lessonId) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        const resources = await database_1.prisma.resource.findMany({
            where: { lessonId },
            orderBy: { title: 'asc' },
        });
        return resources;
    }
    static async getResourceById(resourceId) {
        const resource = await database_1.prisma.resource.findUnique({
            where: { id: resourceId },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        module: {
                            select: {
                                id: true,
                                title: true,
                                course: {
                                    select: {
                                        id: true,
                                        courseCode: true,
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!resource) {
            throw new types_1.AppError('Resource not found', 404);
        }
        return resource;
    }
    static async createResource(data) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: data.lessonId },
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        if (data.resourceType === types_2.ResourceType.LINK && !data.url) {
            throw new types_1.AppError('URL is required for link resources', 400);
        }
        if (data.resourceType === types_2.ResourceType.PDF && !data.url) {
            throw new types_1.AppError('File URL is required for PDF resources', 400);
        }
        const resource = await database_1.prisma.resource.create({
            data,
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        return resource;
    }
    static async updateResource(resourceId, data) {
        const existingResource = await database_1.prisma.resource.findUnique({
            where: { id: resourceId },
        });
        if (!existingResource) {
            throw new types_1.AppError('Resource not found', 404);
        }
        const newType = data.resourceType || existingResource.resourceType;
        const newUrl = data.url !== undefined ? data.url : existingResource.url;
        if (newType === types_2.ResourceType.LINK && !newUrl) {
            throw new types_1.AppError('URL is required for link resources', 400);
        }
        if (newType === types_2.ResourceType.PDF && !newUrl) {
            throw new types_1.AppError('File URL is required for PDF resources', 400);
        }
        const resource = await database_1.prisma.resource.update({
            where: { id: resourceId },
            data,
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        return resource;
    }
    static async deleteResource(resourceId) {
        const resource = await database_1.prisma.resource.findUnique({
            where: { id: resourceId },
        });
        if (!resource) {
            throw new types_1.AppError('Resource not found', 404);
        }
        await database_1.prisma.resource.delete({
            where: { id: resourceId },
        });
        return { message: 'Resource deleted successfully' };
    }
    static async getResourcesByType(type, lessonId) {
        const where = { type };
        if (lessonId) {
            const lesson = await database_1.prisma.lesson.findUnique({
                where: { id: lessonId },
            });
            if (!lesson) {
                throw new types_1.AppError('Lesson not found', 404);
            }
            where.lessonId = lessonId;
        }
        const resources = await database_1.prisma.resource.findMany({
            where,
            orderBy: { title: 'asc' },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        module: {
                            select: {
                                id: true,
                                title: true,
                                course: {
                                    select: {
                                        id: true,
                                        courseCode: true,
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return resources;
    }
    static async searchResources(query, type, lessonId) {
        const where = {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ],
        };
        if (type) {
            where.type = type;
        }
        if (lessonId) {
            const lesson = await database_1.prisma.lesson.findUnique({
                where: { id: lessonId },
            });
            if (!lesson) {
                throw new types_1.AppError('Lesson not found', 404);
            }
            where.lessonId = lessonId;
        }
        const resources = await database_1.prisma.resource.findMany({
            where,
            orderBy: { title: 'asc' },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        module: {
                            select: {
                                id: true,
                                title: true,
                                course: {
                                    select: {
                                        id: true,
                                        courseCode: true,
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return resources;
    }
    static async bulkCreateResources(lessonId, resources) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        for (const resource of resources) {
            if (resource.resourceType === types_2.ResourceType.LINK && !resource.url) {
                throw new types_1.AppError(`URL is required for link resource: ${resource.title}`, 400);
            }
            if (resource.resourceType === types_2.ResourceType.PDF && !resource.url) {
                throw new types_1.AppError(`File URL is required for PDF resource: ${resource.title}`, 400);
            }
        }
        const createdResources = await database_1.prisma.$transaction(resources.map((resource) => database_1.prisma.resource.create({
            data: {
                ...resource,
                lessonId,
            },
        })));
        return createdResources;
    }
}
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map