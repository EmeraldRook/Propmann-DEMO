import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return Response.json({ error: 'Amount is required' }, { status: 400 });
    }

    const stripe = getStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // RM to sen
      currency: 'myr',
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'Stripe is not configured' ? 500 : 400;
    return Response.json({ error: message }, { status });
  }
}
