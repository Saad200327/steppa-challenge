import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function stripeWebhook(req, res) {
  if (process.env.ENABLE_REAL_PAYMENTS !== 'true') {
    return res.json({ received: true, message: 'Real payments disabled' });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).send('Webhook signature verification failed');
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, amount } = session.metadata;
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    await prisma.$transaction([
      prisma.wallet.update({ where: { userId }, data: { balance: { increment: Number(amount) }, totalDeposit: { increment: Number(amount) } } }),
      prisma.transaction.create({ data: { walletId: wallet.id, type: 'deposit', amount: Number(amount), description: 'Stripe deposit' } }),
    ]);
  }
  res.json({ received: true });
}
