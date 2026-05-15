import Stripe from 'stripe';

export async function createCheckoutSession(userId, amount) {
  if (process.env.ENABLE_REAL_PAYMENTS !== 'true') {
    return { url: null, mock: true };
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: 'StepCoins Deposit' }, unit_amount: Math.round(amount * 100) }, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/wallet?success=true`,
    cancel_url: `${process.env.CLIENT_URL}/wallet?cancelled=true`,
    metadata: { userId, amount: String(amount) },
  });
  return { url: session.url };
}
