import { Router } from 'express';
import { getTodaySteps, submitManualSteps, syncSteps, getStepHistory } from '../controllers/stepController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/today', getTodaySteps);
router.post('/manual', submitManualSteps);
router.post('/sync', syncSteps);
router.get('/history', getStepHistory);

export default router;
