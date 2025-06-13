import { CreateLessonRequest, UpdateLessonRequest, LessonWithDetails, LessonStatus } from '../types';
export declare class LessonService {
    static getLessonsByModule(moduleId: string, userId?: string): Promise<any>;
    static getLessonById(lessonId: string, userId?: string): Promise<LessonWithDetails>;
    static createLesson(data: CreateLessonRequest): Promise<any>;
    static updateLesson(lessonId: string, data: UpdateLessonRequest): Promise<any>;
    static deleteLesson(lessonId: string): Promise<{
        message: string;
    }>;
    static updateLessonProgress(userId: string, lessonId: string, status: LessonStatus): Promise<any>;
    static getUserLessonProgress(userId: string, courseId: string): Promise<any>;
    static reorderLessons(moduleId: string, lessonOrders: {
        lessonId: string;
        order: number;
    }[]): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=lesson.service.d.ts.map