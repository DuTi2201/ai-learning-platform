import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                googleId: string;
                email: string;
                fullName: string;
                profilePictureUrl: string | null;
                role: 'ADMIN' | 'USER';
                createdAt: Date;
            };
        }
    }
}
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => void;
export declare const checkAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const optionalAuth: (req: Request, res: Response, next: NextFunction) => void;
export declare const generateToken: (userId: string) => string;
//# sourceMappingURL=auth.d.ts.map