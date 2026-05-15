import { Router } from 'express';
import { register, login, refresh, logout, getMe, updateMe } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateMe);

export default router;
