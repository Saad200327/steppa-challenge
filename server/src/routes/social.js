import { Router } from 'express';
import { sendFriendRequest, acceptFriendRequest, getFriends, createGroup, joinGroup, getGroup, sendTaunt } from '../controllers/socialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/friends/request', sendFriendRequest);
router.put('/friends/:id/accept', acceptFriendRequest);
router.get('/friends', getFriends);
router.post('/groups', createGroup);
router.post('/groups/join/:code', joinGroup);
router.get('/groups/:id', getGroup);
router.post('/taunt/:userId', sendTaunt);

export default router;
