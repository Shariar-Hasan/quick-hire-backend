import { Request, Response } from 'express';
import { locationService } from './location.service';

export const locationController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await locationService.findAll(req.query);
            res.json({ success: true, message: 'Locations fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const location = await locationService.findOne(Number(req.params.id));
            if (!location) {
                res.status(404).json({ success: false, message: 'Location not found' });
                return;
            }
            res.json({ success: true, message: 'Location fetched', data: location });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const location = await locationService.create(req.body);
            res.status(201).json({ success: true, message: 'Location created', data: location });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const location = await locationService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'Location updated', data: location });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await locationService.remove(Number(req.params.id));
            res.json({ success: true, message: 'Location deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findAllForDropDown: async (req: Request, res: Response) => {
        try {
            const data = await locationService.findAllForDropDown();
            res.json({ success: true, message: 'Locations fetched', data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};


