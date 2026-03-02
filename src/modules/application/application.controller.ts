import { Request, Response } from 'express';
import { applicationService } from './application.service';

export const applicationController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await applicationService.findAll(req.query);
            res.json({ success: true, message: 'Applications fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findByJob: async (req: Request, res: Response) => {
        try {
            const result = await applicationService.findByJob(Number(req.params.jobId), req.query);
            res.json({ success: true, message: 'Applications fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const application = await applicationService.findOne(Number(req.params.id));
            if (!application) {
                res.status(404).json({ success: false, message: 'Application not found' });
                return;
            }
            res.json({ success: true, message: 'Application fetched', data: application });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const application = await applicationService.create(req.body);
            res.status(201).json({ success: true, message: 'Application submitted', data: application });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateStatus: async (req: Request, res: Response) => {
        try {
            const application = await applicationService.updateStatus(Number(req.params.id), req.body.status);
            res.json({ success: true, message: 'Application status updated', data: application });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const application = await applicationService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'Application updated', data: application });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await applicationService.remove(Number(req.params.id));
            res.json({ success: true, message: 'Application deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};


