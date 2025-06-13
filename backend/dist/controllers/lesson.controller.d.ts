import { Request, Response } from 'express';
export declare class LessonController {
    static getLessonsByModule: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getLessonById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createLesson: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateLesson: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteLesson: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateLessonProgress: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserLessonProgress: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static reorderLessons: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=lesson.controller.d.ts.map