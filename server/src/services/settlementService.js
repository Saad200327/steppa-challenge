import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { logger } from '../utils/logger.js';

const prisma = new PrismaClient();

export async function settleChallenge(challengeId) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: { bets: { include: { user: true } } },
  });
  if (!challenge || challenge.status === 'settled') return;

  logger.info(`Settling challenge: ${challenge.title}`);

  const dateStr = format(challenge.endTime, 'yyyy-MM-dd');
  const winners = [];
  const losers = [];

  for (const bet of challenge.bets) {
    const stepLog = await prisma.stepLog.findUnique({
      where: { userId_date: { userId: bet.userId, date: dateStr } },
    });
    const steps = stepLog?.steps || 0;
    const goalMet = steps >= challenge.stepGoal;
    if (goalMet) winners.push({ ...bet, steps });
    else losers.push({ ...bet, steps });
  }

  const loserPool = losers.reduce((s, b) => s + b.amount, 0);
  const winnerPool = winners.reduce((s, b) => s + b.amount, 0);
  const totalPool = loserPool + winnerPool;
  const platformFee = totalPool * challenge.platformFee;
  const distributable = loserPool - platformFee;

  for (const bet of winners) {
    const shareRatio = winnerPool > 0 ? bet.amount / winnerPool : 0;
    const extraReward = distributable * shareRatio;
    const totalPayout = bet.amount + extraReward;
    const wallet = await prisma.wallet.findUnique({ where: { userId: bet.userId } });
    await prisma.$transaction([
      prisma.wallet.update({ where: { userId: bet.userId }, data: { balance: { increment: totalPayout } } }),
      prisma.user.update({ where: { id: bet.userId }, data: { totalEarned: { increment: extraReward }, totalWins: { increment: 1 }, winStreak: { increment: 1 } } }),
      prisma.bet.update({ where: { id: bet.id }, data: { status: 'won', goalMet: true, stepsAchieved: bet.steps, payout: totalPayout, profitLoss: extraReward, settledAt: new Date() } }),
      prisma.transaction.create({ data: { walletId: wallet.id, type: 'bet_won', amount: totalPayout, description: `Won: ${challenge.title}` } }),
      prisma.notification.create({ data: { userId: bet.userId, type: 'challenge_won', title: '🎉 Challenge Won!', body: `You won ${totalPayout.toFixed(2)} StepCoins on "${challenge.title}"` } }),
    ]);
  }

  for (const bet of losers) {
    await prisma.$transaction([
      prisma.user.update({ where: { id: bet.userId }, data: { totalLost: { increment: bet.amount }, winStreak: 0, totalChallenges: { increment: 1 } } }),
      prisma.bet.update({ where: { id: bet.id }, data: { status: 'lost', goalMet: false, stepsAchieved: bet.steps, payout: 0, profitLoss: -bet.amount, settledAt: new Date() } }),
      prisma.notification.create({ data: { userId: bet.userId, type: 'challenge_lost', title: '💔 Challenge Lost', body: `You lost ${bet.amount} StepCoins on "${challenge.title}". Better luck tomorrow!` } }),
    ]);
  }

  await prisma.challenge.update({
    where: { id: challengeId },
    data: { status: 'settled', totalPool, winnerPool, loserPool, winnersCount: winners.length, losersCount: losers.length },
  });
  logger.info(`Challenge ${challengeId} settled. Winners: ${winners.length}, Losers: ${losers.length}`);
}
