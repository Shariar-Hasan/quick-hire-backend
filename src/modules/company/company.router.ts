import { Router } from 'express';
import { companyController } from './company.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createCompanySchema } from './validation/create-company.validation';
import { updateCompanySchema } from './validation/update-company.validation';

const router = Router();

// Static routes first (before /:id)
router.get('/me', authMiddleware, companyController.getMyCompany);
router.get('/dropdown', companyController.findAllForDropDown);

// Public
router.get('/', companyController.findAll);
router.get('/:id', companyController.findOne);

// Protected
router.post('/', middleware.auth, validate(createCompanySchema), companyController.create);
router.patch('/:id', middleware.auth, validate(updateCompanySchema), companyController.update);
router.delete('/:id', middleware.auth, companyController.remove);

export default router;

