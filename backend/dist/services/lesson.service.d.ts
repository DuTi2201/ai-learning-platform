import { CreateLessonRequest, UpdateLessonRequest, LessonWithDetails, LessonStatus } from '../types';
export declare class LessonService {
    static getAllLessons(): Promise<({
        _count: {
            resources: number;
        };
        module: {
            id: string;
            course: {
                id: string;
                title: string;
            };
            title: string;
        };
        instructor: {
            id: string;
            fullName: string;
            title: string | null;
        };
    } & {
        id: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    })[]>;
    static getLessonsByModule(moduleId: string, userId?: string): Promise<any[]>;
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
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
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
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
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
            moduleId: string;
            title: string;
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
    static getRecentLessons(): Promise<({
        _count: {
            resources: number;
        };
        module: {
            id: string;
            course: {
                id: string;
                title: string;
            };
            title: string;
        };
        instructor: {
            id: string;
            fullName: string;
            title: string | null;
        };
    } & {
        id: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
    })[]>;
}
//# sourceMappingURL=lesson.service.d.ts.map