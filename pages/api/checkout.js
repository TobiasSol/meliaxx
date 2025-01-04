import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { duration, is4K, extras, totalPrice } = req.body;

    // Erstelle Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Custom Video (${duration} Minuten)`,
              description: `4K: ${is4K ? 'Ja' : 'Nein'}, Extras: ${extras.join(', ') || 'Keine'}`,
            },
            unit_amount: totalPrice * 100, // Stripe verwendet Cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 