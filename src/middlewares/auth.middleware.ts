import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/db';

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

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

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

    // DEV: use the first existing user as the authenticated user
    const user = await prisma.user.findFirst({ select: { id: true, role: true } });
    if (!user) {
        res.status(401).json({ success: false, message: 'No users exist. Please seed the database.' });
        return;
    }
    req.user = { id: user.id, role: user.role };
    next();
};
