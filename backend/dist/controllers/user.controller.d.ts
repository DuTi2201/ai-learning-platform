import { Request, Response } from 'express';
export declare class UserController {
    static getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCurrentUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateCurrentUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateUserRole: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCurrentUserProgress: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserProgress: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCurrentUserCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCurrentUserStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getAllInstructors: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static assignCourseToUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static removeCourseFromUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getUserAssignedCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=user.controller.d.ts.map