import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getWallet(req, res, next) {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.userId },
      include: { transactions: { orderBy: { createdAt: 'desc' }, take: 20 } },
    });
    res.json(wallet);
  } catch (err) { next(err); }
}

export async function deposit(req, res, next) {
  try {
    const { amount } = req.body;
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.user.userId } });
    const [updated] = await prisma.$transaction([
      prisma.wallet.update({ where: { userId: req.user.userId }, data: { balance: { increment: amount }, totalDeposit: { increment: amount } } }),
      prisma.transaction.create({ data: { walletId: wallet.id, type: 'deposit', amount, description: `Deposit of ${amount} StepCoins` } }),
    ]);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function withdraw(req, res, next) {
  try {
    const { amount } = req.body;
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.user.userId } });
    if (wallet.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });
    const [updated] = await prisma.$transaction([
      prisma.wallet.update({ where: { userId: req.user.userId }, data: { balance: { decrement: amount }, totalWithdraw: { increment: amount } } }),
      prisma.transaction.create({ data: { walletId: wallet.id, type: 'withdraw', amount: -amount, description: `Withdrawal of ${amount} StepCoins` } }),
    ]);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function getTransactions(req, res, next) {
  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.user.userId } });
    const transactions = await prisma.transaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(transactions);
  } catch (err) { next(err); }
}
