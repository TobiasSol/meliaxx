// 2. Erstelle pages/api/newsletter.js
import { sendMail } from '../../lib/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'E-Mail-Adresse ist erforderlich' });
  }

  try {
    // E-Mail an dich (Admin)
    const result = await sendMail({
      to: process.env.CONTACT_EMAIL,
      subject: 'Neue Newsletter-Anmeldung',
      text: `Neue Newsletter-Anmeldung von: ${email}`,
      html: `
        <h2>Neue Newsletter-Anmeldung</h2>
        <p>Eine neue Person hat sich für den Newsletter angemeldet:</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p>Zeitpunkt: ${new Date().toLocaleString('de-DE')}</p>
      `
    });

    if (result.success) {
      // Bestätigungs-E-Mail an den Abonnenten
      await sendMail({
        to: email,
        subject: 'Newsletter-Anmeldung bestätigt',
        text: `
          Vielen Dank für deine Newsletter-Anmeldung!
          
          Du wirst ab jetzt regelmäßig Updates von uns erhalten.
          
          Mit besten Grüßen
          Dein Meliax-Team
        `,
        html: `
          <h2>Willkommen beim Meliax Newsletter!</h2>
          <p>Vielen Dank für deine Anmeldung zu unserem Newsletter!</p>
          <p>Du wirst ab jetzt regelmäßig Updates von uns erhalten.</p>
          <p>
            Mit besten Grüßen<br>
            Dein Meliax-Team
          </p>
        `
      });

      res.status(200).json({ message: 'Newsletter-Anmeldung erfolgreich' });
    } else {
      throw new Error('Failed to send confirmation email');
    }
  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({ message: 'Fehler bei der Newsletter-Anmeldung' });
  }
}