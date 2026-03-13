import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0 || !description) {
      return Response.json(
        { error: 'Amount and description are required' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    const product = await stripe.products.create({
      name: description,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100), // RM to sen
      currency: 'myr',
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
    });

    return Response.json({ url: paymentLink.url, id: paymentLink.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'Stripe is not configured' ? 500 : 400;
    return Response.json({ error: message }, { status });
  }
}
