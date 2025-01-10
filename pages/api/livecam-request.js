import { sendMail } from '../../lib/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, duration, quality, extras, totalPrice } = req.body;

  try {
    // E-Mail an Admin
    const adminResult = await sendMail({
      to: process.env.CONTACT_EMAIL,
      subject: 'Neue Live Cam Anfrage',
      html: `
        <h2>Neue Live Cam Anfrage</h2>
        <p><strong>Kunde E-Mail:</strong> ${email}</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Dauer:</strong> ${duration} Minuten</li>
          <li><strong>Qualität:</strong> ${quality}</li>
          <li><strong>Extras:</strong> ${extras.join(', ')}</li>
        </ul>
        <p><strong>Gesamtpreis:</strong> ${totalPrice}€</p>
        <p>Zeitpunkt der Anfrage: ${new Date().toLocaleString('de-DE')}</p>
      `
    });

    if (adminResult.success) {
      // Bestätigungs-E-Mail an Kunden
      const customerResult = await sendMail({
        to: email,
        subject: 'Deine Live Cam Anfrage bei Meliax',
        html: `
          <h2>Vielen Dank für deine Live Cam Anfrage!</h2>
          <p>Hallo!</p>
          <p>Wir haben deine Anfrage erhalten und werden sie schnellstmöglich bearbeiten.</p>
          
          <h3>Deine ausgewählten Details:</h3>
          <ul>
            <li><strong>Dauer:</strong> ${duration} Minuten</li>
            <li><strong>Qualität:</strong> ${quality}</li>
            <li><strong>Extras:</strong> ${extras.join(', ')}</li>
          </ul>
          <p><strong>Gesamtpreis:</strong> ${totalPrice}€</p>
          
          <p>Wir werden uns in Kürze bei dir melden, um die weiteren Details zu besprechen.</p>
          <br>
          <p>
            Mit besten Grüßen<br>
            Dein Meliax-Team
          </p>
        `
      });

      if (customerResult.success) {
        res.status(200).json({ message: 'Anfrage erfolgreich gesendet' });
      } else {
        throw new Error('Failed to send customer confirmation');
      }
    } else {
      throw new Error('Failed to send admin notification');
    }
  } catch (error) {
    console.error('Livecam request error:', error);
    res.status(500).json({ message: 'Fehler beim Senden der Anfrage' });
  }
}