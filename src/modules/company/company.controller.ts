import { Request, Response } from 'express';
import { companyService } from './company.service';

export const companyController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await companyService.findAll(req.query);
            res.json({ success: true, message: 'Companies fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const company = await companyService.findOne(Number(req.params.id));
            if (!company) {
                res.status(404).json({ success: false, message: 'Company not found' });
                return;
            }
            res.json({ success: true, message: 'Company fetched', data: company });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getMyCompany: async (req: Request, res: Response) => {
        try {
            const company = await companyService.findByEmployer(req.user!.id);
            res.json({ success: true, message: 'Company fetched', data: company });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const company = await companyService.create({ ...req.body, employer_id: req.user!.id });
            res.status(201).json({ success: true, message: 'Company created', data: company });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const company = await companyService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'Company updated', data: company });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await companyService.remove(Number(req.params.id));
            res.json({ success: true, message: 'Company deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findAllForDropDown: async (req: Request, res: Response) => {
        try {
            const data = await companyService.findAllForDropDown();
            res.json({ success: true, message: 'Companies fetched', data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};


