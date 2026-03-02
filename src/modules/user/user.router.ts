import { Router } from 'express';
import { userController } from './user.controller';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createUserSchema } from './validation/create-user.validation';
import { updateUserSchema } from './validation/update-user.validation';

const router = Router();

// Protected routes
router.get('/my-profile', middleware.auth, userController.getMyProfile);
router.get('/', middleware.auth, userController.findAll);
router.get('/:id', middleware.auth, userController.findOne);
router.post('/', middleware.auth, validate(createUserSchema), userController.create);
router.patch('/:id', middleware.auth, validate(updateUserSchema), userController.update);
router.delete('/:id', middleware.auth, userController.remove);

export default router;
