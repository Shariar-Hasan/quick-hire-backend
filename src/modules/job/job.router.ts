import { Router } from 'express';
import { jobController } from './job.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';

const router = Router();

// Static routes first (before /:id)
router.get('/with-count', authMiddleware, jobController.findAllWithAppliedCount);
router.get('/slug/:jobId', jobController.findByJobId);

// Public
router.get('/', jobController.findAll);
router.get('/:id', jobController.findOne);

// Protected
router.post('/', middleware.auth, jobController.create);
router.patch('/:id', middleware.auth, jobController.update);
router.delete('/:id', middleware.auth, jobController.remove);

export default router;

