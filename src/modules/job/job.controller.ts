import { Request, Response } from 'express';
import { jobService } from './job.service';

export const jobController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await jobService.findAll(req.query);
            res.json({ success: true, message: 'Jobs fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findAllWithAppliedCount: async (req: Request, res: Response) => {
        try {
            const result = await jobService.findAllWithAppliedCount(req.query);
            res.json({ success: true, message: 'Jobs fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const job = await jobService.findOne(Number(req.params.id));
            if (!job) {
                res.status(404).json({ success: false, message: 'Job not found' });
                return;
            }
            res.json({ success: true, message: 'Job fetched', data: job });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findByJobId: async (req: Request, res: Response) => {
        try {
            const job = await jobService.findByJobId(req.params.jobId as string);
            if (!job) {
                res.status(404).json({ success: false, message: 'Job not found' });
                return;
            }
            res.json({ success: true, message: 'Job fetched', data: job });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const job = await jobService.create({ ...req.body, employer_id: req.user!.id });
            res.status(201).json({ success: true, message: 'Job created', data: job });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const job = await jobService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'Job updated', data: job });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await jobService.remove(Number(req.params.id));
            res.json({ success: true, message: 'Job deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};


