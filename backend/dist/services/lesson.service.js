"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
const types_2 = require("../types");
class LessonService {
    static async getAllLessons() {
        try {
            const lessons = await database_1.prisma.lesson.findMany({
                include: {
                    instructor: {
                        select: {
                            id: true,
                            fullName: true,
                            title: true,
                        },
                    },
                    module: {
                        select: {
                            id: true,
                            title: true,
                            course: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: {
                            resources: true,
                        },
                    },
                },
            });
            return lessons;
        }
        catch (error) {
            console.error('Error in getAllLessons:', error);
            throw error;
        }
    }
    static async getLessonsByModule(moduleId, userId) {
        const module = await database_1.prisma.module.findUnique({
            where: { id: moduleId },
        });
        if (!module) {
            throw new types_1.AppError('Module not found', 404);
        }
        const lessons = await database_1.prisma.lesson.findMany({
            where: { moduleId },
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
        });
        return lessons.map((lesson) => ({
            ...lesson,
            progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
            lessonProgress: undefined,
        }));
    }
    static async getLessonById(lessonId, userId) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
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
                instructor: {
                    select: {
                        id: true,
                        fullName: true,
                        title: true,
                        bio: true,
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
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        const transformedLesson = {
            ...lesson,
            progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
            lessonProgress: undefined,
        };
        return transformedLesson;
    }
    static async createLesson(data) {
        const module = await database_1.prisma.module.findUnique({
            where: { id: data.moduleId },
        });
        if (!module) {
            throw new types_1.AppError('Module not found', 404);
        }
        if (data.instructorId) {
            const instructor = await database_1.prisma.instructor.findUnique({
                where: { id: data.instructorId },
            });
            if (!instructor) {
                throw new types_1.AppError('Instructor not found', 404);
            }
        }
        let lessonOrder = data.lessonOrder;
        if (!lessonOrder) {
            const lastLesson = await database_1.prisma.lesson.findFirst({
                where: { moduleId: data.moduleId },
                orderBy: { lessonOrder: 'desc' },
            });
            lessonOrder = lastLesson ? lastLesson.lessonOrder + 1 : 1;
        }
        const existingLesson = await database_1.prisma.lesson.findFirst({
            where: {
                moduleId: data.moduleId,
                lessonOrder: lessonOrder,
            },
        });
        if (existingLesson) {
            await database_1.prisma.lesson.updateMany({
                where: {
                    moduleId: data.moduleId,
                    lessonOrder: { gte: lessonOrder },
                },
                data: {
                    lessonOrder: { increment: 1 },
                },
            });
        }
        const lesson = await database_1.prisma.lesson.create({
            data: {
                ...data,
                lessonOrder: lessonOrder,
            },
            include: {
                module: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
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
            },
        });
        return lesson;
    }
    static async updateLesson(lessonId, data) {
        const existingLesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!existingLesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        if (data.instructorId) {
            const instructor = await database_1.prisma.instructor.findUnique({
                where: { id: data.instructorId },
            });
            if (!instructor) {
                throw new types_1.AppError('Instructor not found', 404);
            }
        }
        if (data.lessonOrder && data.lessonOrder !== existingLesson.lessonOrder) {
            const moduleId = existingLesson.moduleId;
            const oldOrder = existingLesson.lessonOrder;
            const newOrder = data.lessonOrder;
            if (newOrder > oldOrder) {
                await database_1.prisma.lesson.updateMany({
                    where: {
                        moduleId,
                        lessonOrder: {
                            gt: oldOrder,
                            lte: newOrder,
                        },
                    },
                    data: {
                        lessonOrder: { decrement: 1 },
                    },
                });
            }
            else {
                await database_1.prisma.lesson.updateMany({
                    where: {
                        moduleId,
                        lessonOrder: {
                            gte: newOrder,
                            lt: oldOrder,
                        },
                    },
                    data: {
                        lessonOrder: { increment: 1 },
                    },
                });
            }
        }
        const lesson = await database_1.prisma.lesson.update({
            where: { id: lessonId },
            data,
            include: {
                module: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
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
            },
        });
        return lesson;
    }
    static async deleteLesson(lessonId) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        await database_1.prisma.lesson.delete({
            where: { id: lessonId },
        });
        await database_1.prisma.lesson.updateMany({
            where: {
                moduleId: lesson.moduleId,
                lessonOrder: { gt: lesson.lessonOrder },
            },
            data: {
                lessonOrder: { decrement: 1 },
            },
        });
        return { message: 'Lesson deleted successfully' };
    }
    static async updateLessonProgress(userId, lessonId, status) {
        const lesson = await database_1.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                module: {
                    include: {
                        course: {
                            include: {
                                enrollments: {
                                    where: { userId },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!lesson) {
            throw new types_1.AppError('Lesson not found', 404);
        }
        if (lesson.module.course.enrollments.length === 0) {
            throw new types_1.AppError('User is not enrolled in this course', 403);
        }
        const progress = await database_1.prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
            update: {
                status,
                completedAt: status === types_2.LessonStatus.COMPLETED ? new Date() : null,
            },
            create: {
                userId,
                lessonId,
                status,
                completedAt: status === types_2.LessonStatus.COMPLETED ? new Date() : null,
            },
        });
        return progress;
    }
    static async getUserLessonProgress(userId, courseId) {
        const enrollment = await database_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new types_1.AppError('User is not enrolled in this course', 403);
        }
        const progress = await database_1.prisma.lessonProgress.findMany({
            where: {
                userId,
                lesson: {
                    module: {
                        courseId,
                    },
                },
            },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        moduleId: true,
                    },
                },
            },
            orderBy: {
                lesson: {
                    lessonOrder: 'asc',
                },
            },
        });
        return progress;
    }
    static async reorderLessons(moduleId, lessonOrders) {
        const module = await database_1.prisma.module.findUnique({
            where: { id: moduleId },
        });
        if (!module) {
            throw new types_1.AppError('Module not found', 404);
        }
        const lessonIds = lessonOrders.map((item) => item.lessonId);
        const lessons = await database_1.prisma.lesson.findMany({
            where: {
                id: { in: lessonIds },
                moduleId,
            },
        });
        if (lessons.length !== lessonIds.length) {
            throw new types_1.AppError('Some lessons do not belong to this module', 400);
        }
        await database_1.prisma.$transaction(lessonOrders.map(({ lessonId, order }) => database_1.prisma.lesson.update({
            where: { id: lessonId },
            data: { lessonOrder: order },
        })));
        return { message: 'Lessons reordered successfully' };
    }
    static async getRecentLessons() {
        try {
            const lessons = await database_1.prisma.lesson.findMany({
                take: 20,
                orderBy: {
                    id: 'desc',
                },
                include: {
                    instructor: {
                        select: {
                            id: true,
                            fullName: true,
                            title: true,
                        },
                    },
                    module: {
                        select: {
                            id: true,
                            title: true,
                            course: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: {
                            resources: true,
                        },
                    },
                },
            });
            return lessons;
        }
        catch (error) {
            console.error('Error in getRecentLessons:', error);
            throw error;
        }
    }
}
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map