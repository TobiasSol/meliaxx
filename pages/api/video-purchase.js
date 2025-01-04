import { withAuth } from '../../lib/withAuth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { videoId } = req.body;

    // Hier würden Sie die Video-Preise aus einer Datenbank abrufen
    const videoPrices = {
      1: 2999, // 29.99 €
      2: 3499, // 34.99 €
      3: 3999  // 39.99 €
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Video #${videoId}`,
            },
            unit_amount: videoPrices[videoId],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?video=${videoId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default withAuth(handler); 