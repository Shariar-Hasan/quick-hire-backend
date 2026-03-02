import { Router } from 'express';
import { jobController } from './job.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Static routes first (before /:id)
router.get('/with-count', authMiddleware, jobController.findAllWithAppliedCount);
router.get('/slug/:jobId', jobController.findByJobId);

// Public
router.get('/', jobController.findAll);
router.get('/:id', jobController.findOne);

// Protected
router.post('/', authMiddleware, jobController.create);
router.patch('/:id', authMiddleware, jobController.update);
router.delete('/:id', authMiddleware, jobController.remove);

export default router;

