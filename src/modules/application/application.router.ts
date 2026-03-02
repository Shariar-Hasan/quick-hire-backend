import { Router } from 'express';
import { applicationController } from './application.controller';
import { middleware } from '../../middlewares/base.middleware';

const router = Router();

// Protected
router.get('/', middleware.auth, applicationController.findAll);
router.get('/job/:jobId', middleware.auth, applicationController.findByJob);
router.get('/:id', middleware.auth, applicationController.findOne);
router.post('/', applicationController.create);              // Public: submit application
router.patch('/:id/status', middleware.auth, applicationController.updateStatus);
router.patch('/:id', middleware.auth, applicationController.update);
router.delete('/:id', middleware.auth, applicationController.remove);

export default router;
