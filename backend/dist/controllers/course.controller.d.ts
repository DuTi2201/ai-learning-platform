import { Request, Response } from 'express';
export declare class CourseController {
    static getAllCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCourseById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static enrollInCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static unenrollFromCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMyEnrolledCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=course.controller.d.ts.map