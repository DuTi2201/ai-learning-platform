import { CreateLessonRequest, UpdateLessonRequest, LessonWithDetails, LessonStatus } from '../types';
export declare class LessonService {
    static getLessonsByModule(moduleId: string, userId?: string): Promise<{
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
    }[]>;
    static getLessonById(lessonId: string, userId?: string): Promise<LessonWithDetails>;
    static createLesson(data: CreateLessonRequest): Promise<{
        _count: {
            resources: number;
        };
        module: {
            id: string;
            title: string;
        };
        instructor: {
            id: string;
            fullName: string;
            title: string | null;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        moduleId: string;
        instructorId: string;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    }>;
    static updateLesson(lessonId: string, data: UpdateLessonRequest): Promise<{
        _count: {
            resources: number;
        };
        module: {
            id: string;
            title: string;
        };
        instructor: {
            id: string;
            fullName: string;
            title: string | null;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        moduleId: string;
        instructorId: string;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    }>;
    static deleteLesson(lessonId: string): Promise<{
        message: string;
    }>;
    static updateLessonProgress(userId: string, lessonId: string, status: LessonStatus): Promise<{
        id: string;
        userId: string;
        status: import("@/generated/prisma").$Enums.LessonStatus;
        lessonId: string;
        completedAt: Date | null;
    }>;
    static getUserLessonProgress(userId: string, courseId: string): Promise<({
        lesson: {
            id: string;
            title: string;
            moduleId: string;
        };
    } & {
        id: string;
        userId: string;
        status: import("@/generated/prisma").$Enums.LessonStatus;
        lessonId: string;
        completedAt: Date | null;
    })[]>;
    static reorderLessons(moduleId: string, lessonOrders: {
        lessonId: string;
        order: number;
    }[]): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=lesson.service.d.ts.map