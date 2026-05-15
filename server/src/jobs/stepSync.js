import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { fetchGoogleFitSteps } from '../services/googleFitService.js';
import { logger } from '../utils/logger.js';

const prisma = new PrismaClient();

export function startStepSyncJob() {
  const cronExpr = process.env.STEP_SYNC_CRON || '*/30 * * * *';
  cron.schedule(cronExpr, async () => {
    const today = new Date().toISOString().split('T')[0];
    const usersWithGoogleFit = await prisma.user.findMany({
      where: { fitnessProvider: 'google_fit', fitAccessToken: { not: null } },
    });
    for (const user of usersWithGoogleFit) {
      try {
        const steps = await fetchGoogleFitSteps(user.fitAccessToken, today);
        await prisma.stepLog.upsert({
          where: { userId_date: { userId: user.id, date: today } },
          update: { steps, syncedAt: new Date() },
          create: { userId: user.id, date: today, steps, source: 'google_fit', verified: true },
        });
        // Update active bet steps
        await prisma.bet.updateMany({
          where: { userId: user.id, status: 'active' },
          data: { stepsAchieved: steps },
        });
      } catch (err) {
        logger.debug(`Step sync failed for user ${user.id}:`, err.message);
      }
    }
  });
  logger.info(`Step sync cron scheduled: ${cronExpr}`);
}
