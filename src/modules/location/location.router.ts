import { Router } from 'express';
import { locationController } from './location.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';

const router = Router();

// Public
router.get('/dropdown', locationController.findAllForDropDown);
router.get('/', locationController.findAll);
router.get('/:id', locationController.findOne);

// Protected
router.post('/', middleware.auth, locationController.create);
router.patch('/:id', middleware.auth, locationController.update);
router.delete('/:id', middleware.auth, locationController.remove);

export default router;
