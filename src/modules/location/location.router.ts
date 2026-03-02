import { Router } from 'express';
import { locationController } from './location.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Public
router.get('/', locationController.findAll);
router.get('/:id', locationController.findOne);

// Protected
router.post('/', authMiddleware, locationController.create);
router.patch('/:id', authMiddleware, locationController.update);
router.delete('/:id', authMiddleware, locationController.remove);

export default router;
