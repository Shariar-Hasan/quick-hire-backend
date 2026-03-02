import { Router } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';

const router = Router();

// Protected routes
router.get('/my-profile', middleware.auth, userController.getMyProfile);
router.get('/', middleware.auth, userController.findAll);
router.get('/:id', middleware.auth, userController.findOne);
router.post('/', middleware.auth, userController.create);
router.patch('/:id', middleware.auth, userController.update);
router.delete('/:id', middleware.auth, userController.remove);

export default router;
