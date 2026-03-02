import { Router } from 'express';
import { applicationController } from './application.controller';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createApplicationSchema } from './validation/create-application.validation';
import { updateApplicationSchema, updateApplicationStatusSchema } from './validation/update-application.validation';

const router = Router();

// Protected
router.get('/', middleware.auth, applicationController.findAll);
router.get('/job/:jobId', middleware.auth, applicationController.findByJob);
router.get('/:id', middleware.auth, applicationController.findOne);
router.post('/', validate(createApplicationSchema), applicationController.create);              // Public: submit application
router.patch('/:id/status', middleware.auth, validate(updateApplicationStatusSchema), applicationController.updateStatus);
router.patch('/:id', middleware.auth, validate(updateApplicationSchema), applicationController.update);
router.delete('/:id', middleware.auth, applicationController.remove);

export default router;
