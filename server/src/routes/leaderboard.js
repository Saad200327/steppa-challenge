import { Router } from 'express';
import { getGlobalLeaderboard, getWeeklyLeaderboard, getFriendsLeaderboard } from '../controllers/leaderboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/global', getGlobalLeaderboard);
router.get('/weekly', getWeeklyLeaderboard);
router.get('/friends', getFriendsLeaderboard);

export default router;
