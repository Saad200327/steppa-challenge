import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function getStepsForDate(userId, date) {
  const dateStr = typeof date === 'string' ? date : format(new Date(date), 'yyyy-MM-dd');
  const log = await prisma.stepLog.findUnique({
    where: { userId_date: { userId, date: dateStr } },
  });
  return log || { steps: 0 };
}

export function detectSuspiciousActivity(previousSteps, currentSteps, intervalMinutes) {
  const stepsPerMinute = (currentSteps - previousSteps) / intervalMinutes;
  return stepsPerMinute > 200; // > 200 steps/min is suspicious (sprint pace ~180)
}
