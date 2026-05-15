import { Router } from 'express';
import { getWallet, deposit, withdraw, getTransactions } from '../controllers/walletController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getWallet);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/transactions', getTransactions);

export default router;
