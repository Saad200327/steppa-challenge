import express from 'express';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import challengeRoutes from './routes/challenges.js';
import stepRoutes from './routes/steps.js';
import walletRoutes from './routes/wallet.js';
import leaderboardRoutes from './routes/leaderboard.js';
import socialRoutes from './routes/social.js';
import webhookRoutes from './routes/webhooks.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Stripe webhook needs raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date() }));

app.use(errorHandler);

export default app;
