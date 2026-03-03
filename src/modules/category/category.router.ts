import { Router } from 'express';
import { categoryController } from './category.controller';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createCategorySchema } from './validation/create-category.validation';
import { updateCategorySchema } from './validation/update-category.validation';

const router = Router();

// Public
router.get('/dropdown', categoryController.findAllForDropDown);
router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findOne);

// Protected
router.post('/', middleware.auth, validate(createCategorySchema), categoryController.create);
router.patch('/:id', middleware.auth, validate(updateCategorySchema), categoryController.update);
router.delete('/:id', middleware.auth, categoryController.remove);

export default router;
