import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getChallenges(req, res, next) {
  try {
    const challenges = await prisma.challenge.findMany({
      where: { status: { in: ['open', 'active'] } },
      orderBy: { endTime: 'asc' },
      include: { _count: { select: { bets: true } } },
    });
    res.json(challenges);
  } catch (err) { next(err); }
}

export async function getChallenge(req, res, next) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: req.params.id },
      include: {
        bets: { include: { user: { select: { id: true, username: true, displayName: true, avatarUrl: true } } } },
        _count: { select: { bets: true } },
      },
    });
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (err) { next(err); }
}

export async function createChallenge(req, res, next) {
  try {
    const { title, description, stepGoal, betAmount, minBet, maxBet, startTime, endTime, type } = req.body;
    const challenge = await prisma.challenge.create({
      data: { title, description, stepGoal, betAmount, minBet, maxBet, startTime: new Date(startTime), endTime: new Date(endTime), type: type || 'global' },
    });
    res.status(201).json(challenge);
  } catch (err) { next(err); }
}

export async function joinChallenge(req, res, next) {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = req.user.userId;

    const challenge = await prisma.challenge.findUnique({ where: { id } });
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    if (challenge.status === 'settled') return res.status(400).json({ message: 'Challenge already settled' });

    const existingBet = await prisma.bet.findUnique({ where: { userId_challengeId: { userId, challengeId: id } } });
    if (existingBet) return res.status(409).json({ message: 'Already joined this challenge' });

    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    const betAmt = amount || challenge.betAmount;
    if (wallet.balance < betAmt) return res.status(400).json({ message: 'Insufficient balance' });

    const [bet] = await prisma.$transaction([
      prisma.bet.create({ data: { userId, challengeId: id, amount: betAmt } }),
      prisma.wallet.update({ where: { userId }, data: { balance: { decrement: betAmt } } }),
      prisma.challenge.update({ where: { id }, data: { totalPool: { increment: betAmt }, status: 'active' } }),
      prisma.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'bet_placed',
          amount: -betAmt,
          description: `Joined: ${challenge.title}`,
        },
      }),
    ]);

    res.status(201).json(bet);
  } catch (err) { next(err); }
}

export async function getChallengeLeaderboard(req, res, next) {
  try {
    const bets = await prisma.bet.findMany({
      where: { challengeId: req.params.id },
      include: { user: { select: { id: true, username: true, displayName: true, avatarUrl: true } } },
      orderBy: { stepsAchieved: 'desc' },
    });
    res.json(bets);
  } catch (err) { next(err); }
}

export async function getChallengeHistory(req, res, next) {
  try {
    const bets = await prisma.bet.findMany({
      where: { userId: req.user.userId },
      include: { challenge: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bets);
  } catch (err) { next(err); }
}
