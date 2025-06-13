import { Request, Response } from 'express';
export declare class ResourceController {
    static getResourcesByLesson: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getResourceById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createResource: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateResource: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteResource: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getResourcesByType: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static searchResources: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static bulkCreateResources: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=resource.controller.d.ts.map