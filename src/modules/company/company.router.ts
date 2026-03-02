import { Router } from 'express';
import { companyController } from './company.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Static routes first (before /:id)
router.get('/me', authMiddleware, companyController.getMyCompany);

// Public
router.get('/', companyController.findAll);
router.get('/:id', companyController.findOne);

// Protected
router.post('/', authMiddleware, companyController.create);
router.patch('/:id', authMiddleware, companyController.update);
router.delete('/:id', authMiddleware, companyController.remove);

export default router;

