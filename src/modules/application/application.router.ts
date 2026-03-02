import { Router } from 'express';
import { applicationController } from './application.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Protected
router.get('/', authMiddleware, applicationController.findAll);
router.get('/job/:jobId', authMiddleware, applicationController.findByJob);
router.get('/:id', authMiddleware, applicationController.findOne);
router.post('/', applicationController.create);              // Public: submit application
router.patch('/:id/status', authMiddleware, applicationController.updateStatus);
router.patch('/:id', authMiddleware, applicationController.update);
router.delete('/:id', authMiddleware, applicationController.remove);

export default router;
