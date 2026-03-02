import { Request, Response } from 'express';
import { userService } from './user.service';

export const userController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await userService.findAll(req.query);
            res.json({ success: true, message: 'Users fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const user = await userService.findOne(Number(req.params.id));
            if (!user) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
            res.json({ success: true, message: 'User fetched', data: user });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const user = await userService.create(req.body);
            res.status(201).json({ success: true, message: 'User created', data: user });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const user = await userService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'User updated', data: user });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await userService.remove(Number(req.params.id));
            res.json({ success: true, message: 'User deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getMyProfile: async (req: Request, res: Response) => {
        try {
            const user = await userService.getMyProfile(req.user!.id);
            res.json({ success: true, message: 'Profile fetched', data: { user } });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};
