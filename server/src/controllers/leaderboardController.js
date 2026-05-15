import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGlobalLeaderboard(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { totalEarned: 'desc' },
      take: 50,
      select: { id: true, username: true, displayName: true, avatarUrl: true, totalEarned: true, totalWins: true, totalChallenges: true, winStreak: true, bestStreak: true },
    });
    res.json(users);
  } catch (err) { next(err); }
}

export async function getWeeklyLeaderboard(req, res, next) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const bets = await prisma.bet.groupBy({
      by: ['userId'],
      where: { status: 'won', settledAt: { gte: since } },
      _sum: { payout: true },
      orderBy: { _sum: { payout: 'desc' } },
      take: 50,
    });
    const userIds = bets.map((b) => b.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, displayName: true, avatarUrl: true, winStreak: true },
    });
    const result = bets.map((b) => ({
      ...users.find((u) => u.id === b.userId),
      weeklyEarned: b._sum.payout,
    }));
    res.json(result);
  } catch (err) { next(err); }
}

export async function getFriendsLeaderboard(req, res, next) {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ senderId: req.user.userId, status: 'accepted' }, { receiverId: req.user.userId, status: 'accepted' }],
      },
    });
    const friendIds = friendships.map((f) => f.senderId === req.user.userId ? f.receiverId : f.senderId);
    friendIds.push(req.user.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: friendIds } },
      orderBy: { totalEarned: 'desc' },
      select: { id: true, username: true, displayName: true, avatarUrl: true, totalEarned: true, totalWins: true, winStreak: true },
    });
    res.json(users);
  } catch (err) { next(err); }
}
