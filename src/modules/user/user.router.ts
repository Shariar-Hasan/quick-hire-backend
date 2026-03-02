import { Router } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Protected routes
router.get('/my-profile', authMiddleware, userController.getMyProfile);
router.get('/', authMiddleware, userController.findAll);
router.get('/:id', authMiddleware, userController.findOne);
router.post('/', authMiddleware, userController.create);
router.patch('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.remove);

export default router;
