import { Router } from 'express';
import { locationController } from './location.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createLocationSchema } from './validation/create-location.validation';
import { updateLocationSchema } from './validation/update-location.validation';

const router = Router();

// Public
router.get('/dropdown', locationController.findAllForDropDown);
router.get('/', locationController.findAll);
router.get('/:id', locationController.findOne);

// Protected
router.post('/', middleware.auth, validate(createLocationSchema), locationController.create);
router.patch('/:id', middleware.auth, validate(updateLocationSchema), locationController.update);
router.delete('/:id', middleware.auth, locationController.remove);

export default router;
