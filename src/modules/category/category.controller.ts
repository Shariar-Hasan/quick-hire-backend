import { Request, Response } from 'express';
import { categoryService } from './category.service';

export const categoryController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const result = await categoryService.findAll(req.query);
            res.json({ success: true, message: 'Categories fetched', data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findOne: async (req: Request, res: Response) => {
        try {
            const category = await categoryService.findOne(Number(req.params.id));
            if (!category) {
                res.status(404).json({ success: false, message: 'Category not found' });
                return;
            }
            res.json({ success: true, message: 'Category fetched', data: category });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json({ success: true, message: 'Category created', data: category });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const category = await categoryService.update(Number(req.params.id), req.body);
            res.json({ success: true, message: 'Category updated', data: category });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req: Request, res: Response) => {
        try {
            await categoryService.remove(Number(req.params.id));
            res.json({ success: true, message: 'Category deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    findAllForDropDown: async (req: Request, res: Response) => {
        try {
            const data = await categoryService.findAllForDropDown();
            res.json({ success: true, message: 'Categories fetched', data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};
