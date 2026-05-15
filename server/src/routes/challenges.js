import { Router } from 'express';
import { getChallenges, getChallenge, createChallenge, joinChallenge, getChallengeLeaderboard, getChallengeHistory } from '../controllers/challengeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getChallenges);
router.get('/history', getChallengeHistory);
router.get('/:id', getChallenge);
router.post('/', createChallenge);
router.post('/:id/join', joinChallenge);
router.get('/:id/leaderboard', getChallengeLeaderboard);

export default router;
