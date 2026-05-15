import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export async function getTodaySteps(req, res, next) {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const log = await prisma.stepLog.findUnique({
      where: { userId_date: { userId: req.user.userId, date: today } },
    });
    res.json(log || { steps: 0, date: today, source: 'none' });
  } catch (err) { next(err); }
}

export async function submitManualSteps(req, res, next) {
  try {
    const { steps, date } = req.body;
    const logDate = date || format(new Date(), 'yyyy-MM-dd');
    const log = await prisma.stepLog.upsert({
      where: { userId_date: { userId: req.user.userId, date: logDate } },
      update: { steps, source: 'manual', syncedAt: new Date() },
      create: { userId: req.user.userId, date: logDate, steps, source: 'manual' },
    });
    // Update related active bets
    const activeBets = await prisma.bet.findMany({
      where: { userId: req.user.userId, status: 'active' },
    });
    for (const bet of activeBets) {
      await prisma.bet.update({ where: { id: bet.id }, data: { stepsAchieved: steps } });
    }
    res.json(log);
  } catch (err) { next(err); }
}

export async function syncSteps(req, res, next) {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const log = await prisma.stepLog.findUnique({
      where: { userId_date: { userId: req.user.userId, date: today } },
    });
    res.json({ message: 'Sync triggered', current: log });
  } catch (err) { next(err); }
}

export async function getStepHistory(req, res, next) {
  try {
    const logs = await prisma.stepLog.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: 'desc' },
      take: 30,
    });
    res.json(logs);
  } catch (err) { next(err); }
}
