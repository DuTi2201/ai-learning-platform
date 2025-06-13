"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
class ModuleService {
    static async getModulesByCourse(courseId, userId) {
        const course = await database_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        const modules = await database_1.prisma.module.findMany({
            where: { courseId },
            orderBy: { moduleOrder: 'asc' },
            include: {
                lessons: {
                    orderBy: { lessonOrder: 'asc' },
                    include: {
                        instructor: {
                            select: {
                                id: true,
                                fullName: true,
                                title: true,
                            },
                        },
                        _count: {
                            select: {
                                resources: true,
                            },
                        },
                        ...(userId && {
                            lessonProgress: {
                                where: { userId },
                                select: {
                                    status: true,
                                    completedAt: true,
                                },
                            },
                        }),
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        return modules.map((module) => ({
            ...module,
            lessons: module.lessons.map((lesson) => ({
                ...lesson,
                progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
                lessonProgress: undefined,
            })),
        }));
    }
    static async getModuleById(moduleId, userId) {
        const module = await database_1.prisma.module.findUnique({
            where: { id: moduleId },
            include: {
                course: {
                    select: {
                        id: true,
                        courseCode: true,
                        title: true,
                    },
                },
                lessons: {
                    orderBy: { lessonOrder: 'asc' },
                    include: {
                        instructor: {
                            select: {
                                id: true,
                                fullName: true,
                                title: true,
                            },
                        },
                        resources: {
                            orderBy: { title: 'asc' },
                        },
                        ...(userId && {
                            lessonProgress: {
                                where: { userId },
                                select: {
                                    status: true,
                                    completedAt: true,
                                },
                            },
                        }),
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        if (!module) {
            throw new types_1.AppError('Module not found', 404);
        }
        const transformedModule = {
            ...module,
            lessons: module.lessons.map((lesson) => ({
                ...lesson,
                progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
                lessonProgress: undefined,
            })),
        };
        return transformedModule;
    }
    static async createModule(data) {
        const course = await database_1.prisma.course.findUnique({
            where: { id: data.courseId },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        let moduleOrder = data.moduleOrder;
        if (!moduleOrder) {
            const lastModule = await database_1.prisma.module.findFirst({
                where: { courseId: data.courseId },
                orderBy: { moduleOrder: 'desc' },
            });
            moduleOrder = lastModule ? lastModule.moduleOrder + 1 : 1;
        }
        const existingModule = await database_1.prisma.module.findFirst({
            where: {
                courseId: data.courseId,
                moduleOrder,
            },
        });
        if (existingModule) {
            await database_1.prisma.module.updateMany({
                where: {
                    courseId: data.courseId,
                    moduleOrder: { gte: moduleOrder },
                },
                data: {
                    moduleOrder: { increment: 1 },
                },
            });
        }
        const module = await database_1.prisma.module.create({
            data: {
                ...data,
                moduleOrder,
            },
            include: {
                course: {
                    select: {
                        id: true,
                        courseCode: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        return module;
    }
    static async updateModule(moduleId, data) {
        const existingModule = await database_1.prisma.module.findUnique({
            where: { id: moduleId },
        });
        if (!existingModule) {
            throw new types_1.AppError('Module not found', 404);
        }
        if (data.moduleOrder && data.moduleOrder !== existingModule.moduleOrder) {
            const courseId = existingModule.courseId;
            const oldOrder = existingModule.moduleOrder;
            const newOrder = data.moduleOrder;
            if (newOrder > oldOrder) {
                await database_1.prisma.module.updateMany({
                    where: {
                        courseId,
                        moduleOrder: {
                            gt: oldOrder,
                            lte: newOrder,
                        },
                    },
                    data: {
                        moduleOrder: { decrement: 1 },
                    },
                });
            }
            else {
                await database_1.prisma.module.updateMany({
                    where: {
                        courseId,
                        moduleOrder: {
                            gte: newOrder,
                            lt: oldOrder,
                        },
                    },
                    data: {
                        moduleOrder: { increment: 1 },
                    },
                });
            }
        }
        const module = await database_1.prisma.module.update({
            where: { id: moduleId },
            data,
            include: {
                course: {
                    select: {
                        id: true,
                        courseCode: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        return module;
    }
    static async deleteModule(moduleId) {
        const module = await database_1.prisma.module.findUnique({
            where: { id: moduleId },
        });
        if (!module) {
            throw new types_1.AppError('Module not found', 404);
        }
        await database_1.prisma.module.delete({
            where: { id: moduleId },
        });
        await database_1.prisma.module.updateMany({
            where: {
                courseId: module.courseId,
                moduleOrder: { gt: module.moduleOrder },
            },
            data: {
                moduleOrder: { decrement: 1 },
            },
        });
        return { message: 'Module deleted successfully' };
    }
    static async reorderModules(courseId, moduleOrders) {
        const course = await database_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        const moduleIds = moduleOrders.map((item) => item.moduleId);
        const modules = await database_1.prisma.module.findMany({
            where: {
                id: { in: moduleIds },
                courseId,
            },
        });
        if (modules.length !== moduleIds.length) {
            throw new types_1.AppError('Some modules do not belong to this course', 400);
        }
        await database_1.prisma.$transaction(moduleOrders.map(({ moduleId, order }) => database_1.prisma.module.update({
            where: { id: moduleId },
            data: { moduleOrder: order },
        })));
        return { message: 'Modules reordered successfully' };
    }
}
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map