import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { settleChallenge } from '../services/settlementService.js';
import { logger } from '../utils/logger.js';

const prisma = new PrismaClient();

export function startSettlementJob() {
  const cronExpr = process.env.SETTLEMENT_CRON || '0 0 * * *';
  cron.schedule(cronExpr, async () => {
    logger.info('Running midnight settlement job...');
    const activeChallenges = await prisma.challenge.findMany({
      where: { status: 'active', endTime: { lte: new Date() } },
    });
    for (const challenge of activeChallenges) {
      try {
        await settleChallenge(challenge.id);
      } catch (err) {
        logger.error(`Failed to settle challenge ${challenge.id}:`, err.message);
      }
    }
  });
  logger.info(`Settlement cron scheduled: ${cronExpr}`);
}
