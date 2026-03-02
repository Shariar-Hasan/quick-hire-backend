import { Request, Response, NextFunction } from 'express';

// Extend Express Request to carry the authenticated user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: string;
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     res.status(401).json({ success: false, message: 'Unauthorized' });
    //     return;
    // }

    // const token = authHeader.split(' ')[1];
    // try {
    //     const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };
    //     req.user = { id: payload.id, role: payload.role };
    //     next();
    // } catch {
    //     res.status(401).json({ success: false, message: 'Invalid token' });
    // }


    req.user = { id: 1, role: 'EMPLOYER' };
    next();
};
