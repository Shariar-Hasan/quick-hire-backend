import { Router } from 'express';
import { jobController } from './job.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { middleware } from '../../middlewares/base.middleware';
import { validate } from '../../lib/validate';
import { createJobSchema } from './validation/create-job.validation';
import { updateJobSchema } from './validation/update-job.validation';

const router = Router();

// Static routes first (before /:id)
router.get('/with-count', authMiddleware, jobController.findAllWithAppliedCount);
router.get('/analytics', authMiddleware, jobController.getAnalytics);
router.get('/slug/:jobId', jobController.findByJobId);

// Public
router.get('/', jobController.findAll);
router.get('/:id', jobController.findOne);

// Protected
router.post('/', middleware.auth, validate(createJobSchema), jobController.create);
router.patch('/:id', middleware.auth, validate(updateJobSchema), jobController.update);
router.delete('/:id', middleware.auth, jobController.remove);

export default router;

