import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { emitToUser } from '../services/socketService.js';
import { logger } from '../utils/logger.js';

const prisma = new PrismaClient();

const panicTimes = [
  { cron: process.env.PANIC_CRON_1 || '0 23 * * *', minutesLeft: 60 },
  { cron: process.env.PANIC_CRON_2 || '30 23 * * *', minutesLeft: 30 },
  { cron: process.env.PANIC_CRON_3 || '52 23 * * *', minutesLeft: 8 },
];

async function sendPanicAlerts(minutesLeft) {
  const today = new Date().toISOString().split('T')[0];
  const activeBets = await prisma.bet.findMany({
    where: { status: 'active' },
    include: {
      user: true,
      challenge: true,
    },
  });
  for (const bet of activeBets) {
    const stepLog = await prisma.stepLog.findUnique({
      where: { userId_date: { userId: bet.userId, date: today } },
    });
    const currentSteps = stepLog?.steps || 0;
    const stepsNeeded = bet.challenge.stepGoal - currentSteps;
    if (stepsNeeded > 0) {
      const message = `⚠️ ${minutesLeft} minutes left — you need ${stepsNeeded.toLocaleString()} more steps or you lose ${bet.amount} StepCoins!`;
      emitToUser(bet.userId, 'panic:alert', { message, stepsNeeded, minutesLeft, amount: bet.amount });
      await prisma.notification.create({
        data: { userId: bet.userId, type: 'panic_alert', title: `⚠️ ${minutesLeft}min Warning`, body: message },
      });
    }
  }
}

export function startPanicAlertJob() {
  for (const { cron: cronExpr, minutesLeft } of panicTimes) {
    cron.schedule(cronExpr, () => {
      logger.info(`Running panic alert job: ${minutesLeft}min left`);
      sendPanicAlerts(minutesLeft).catch((err) => logger.error('Panic alert error:', err.message));
    });
  }
  logger.info('Panic alert crons scheduled');
}
