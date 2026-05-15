import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { addDays, subDays, format } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const users = [
    { email: 'admin@steppa.com', username: 'admin', displayName: 'Admin', password: 'Admin123!' },
    { email: 'alex@example.com', username: 'alex_j', displayName: 'Alex Johnson', password: 'Test1234!' },
    { email: 'maya@example.com', username: 'maya_k', displayName: 'Maya Kim', password: 'Test1234!' },
    { email: 'chris@example.com', username: 'chris_r', displayName: 'Chris Rivera', password: 'Test1234!' },
    { email: 'sam@example.com', username: 'sam_w', displayName: 'Sam Walker', password: 'Test1234!' },
    { email: 'jordan@example.com', username: 'jordan_b', displayName: 'Jordan Bell', password: 'Test1234!' },
  ];

  const createdUsers = [];
  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { email: u.email, username: u.username, displayName: u.displayName, passwordHash },
    });
    await prisma.wallet.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, balance: 100 },
    });
    createdUsers.push(user);
  }

  const now = new Date();
  const todayStr = format(now, 'yyyy-MM-dd');
  const midnight = new Date(); midnight.setHours(23, 59, 59, 999);

  const challenges = [
    { title: 'Daily Grind — 10K Steps', description: 'Hit 10,000 steps today and earn from those who don\'t.', stepGoal: 10000, betAmount: 5, minBet: 5, maxBet: 5, startTime: now, endTime: midnight },
    { title: 'Power Walk — 10K for $10', description: 'Double the stakes, same goal.', stepGoal: 10000, betAmount: 10, minBet: 10, maxBet: 10, startTime: now, endTime: midnight },
    { title: 'High Roller — 10K for $25', description: 'For serious walkers only.', stepGoal: 10000, betAmount: 25, minBet: 25, maxBet: 25, startTime: now, endTime: midnight },
  ];

  const createdChallenges = [];
  for (const c of challenges) {
    const ch = await prisma.challenge.create({ data: c });
    createdChallenges.push(ch);
  }

  // Past settled challenges
  const yesterday = subDays(now, 1);
  const yesterdayMidnight = new Date(yesterday); yesterdayMidnight.setHours(23, 59, 59);
  const pastChallenge1 = await prisma.challenge.create({
    data: {
      title: 'Yesterday\'s Challenge — $10',
      stepGoal: 10000,
      betAmount: 10,
      minBet: 10,
      maxBet: 10,
      startTime: yesterday,
      endTime: yesterdayMidnight,
      status: 'settled',
      totalPool: 40,
      winnerPool: 20,
      loserPool: 20,
      winnersCount: 2,
      losersCount: 2,
    },
  });

  // Add some bets and step logs for demo users
  const stepData = [11500, 9200, 14300, 7800, 10500];
  for (let i = 1; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    const steps = stepData[i - 1];
    // Today's step log
    await prisma.stepLog.upsert({
      where: { userId_date: { userId: user.id, date: todayStr } },
      update: {},
      create: { userId: user.id, date: todayStr, steps, source: 'manual', verified: true },
    });
    // Historical step logs
    for (let d = 1; d <= 7; d++) {
      const dateStr = format(subDays(now, d), 'yyyy-MM-dd');
      const randomSteps = Math.floor(Math.random() * 6000) + 7000;
      await prisma.stepLog.upsert({
        where: { userId_date: { userId: user.id, date: dateStr } },
        update: {},
        create: { userId: user.id, date: dateStr, steps: randomSteps, source: 'manual' },
      });
    }
    // Join first active challenge
    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    await prisma.bet.upsert({
      where: { userId_challengeId: { userId: user.id, challengeId: createdChallenges[0].id } },
      update: {},
      create: { userId: user.id, challengeId: createdChallenges[0].id, amount: 5, stepsAchieved: steps, status: 'active' },
    });
    await prisma.wallet.update({ where: { userId: user.id }, data: { balance: { decrement: 5 } } });
    await prisma.challenge.update({ where: { id: createdChallenges[0].id }, data: { totalPool: { increment: 5 }, status: 'active' } });
  }

  // Add settled bets for past challenge
  const settledWinners = createdUsers.slice(1, 3);
  const settledLosers = createdUsers.slice(3, 5);
  for (const user of settledWinners) {
    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    await prisma.bet.create({ data: { userId: user.id, challengeId: pastChallenge1.id, amount: 10, status: 'won', goalMet: true, stepsAchieved: 11000, payout: 18, profitLoss: 8, settledAt: yesterdayMidnight } });
    await prisma.transaction.create({ data: { walletId: wallet.id, type: 'bet_won', amount: 18, description: 'Won: Yesterday\'s Challenge' } });
    await prisma.user.update({ where: { id: user.id }, data: { totalEarned: { increment: 8 }, totalWins: { increment: 1 }, winStreak: { increment: 1 } } });
  }
  for (const user of settledLosers) {
    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    await prisma.bet.create({ data: { userId: user.id, challengeId: pastChallenge1.id, amount: 10, status: 'lost', goalMet: false, stepsAchieved: 8200, payout: 0, profitLoss: -10, settledAt: yesterdayMidnight } });
    await prisma.transaction.create({ data: { walletId: wallet.id, type: 'bet_lost', amount: -10, description: 'Lost: Yesterday\'s Challenge' } });
    await prisma.user.update({ where: { id: user.id }, data: { totalLost: { increment: 10 } } });
  }

  console.log('✅ Database seeded successfully!');
  console.log('
Demo accounts:');
  users.forEach((u) => console.log(`  ${u.email} / ${u.password}`));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
