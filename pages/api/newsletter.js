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
    // E-Mail an Admin (dich)
    const result = await sendMail({
      to: process.env.CONTACT_EMAIL,
      subject: 'Neue Newsletter-Anmeldung',
      text: `
        Neue Newsletter-Anmeldung!
        
        E-Mail: ${email}
        Zeitpunkt: ${new Date().toLocaleString('de-DE')}

        Diese E-Mail wurde automatisch generiert.
      `,
      html: `
        <h2>Neue Newsletter-Anmeldung!</h2>
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
        </div>
        <p style="color: #666; font-size: 12px;">Diese E-Mail wurde automatisch generiert.</p>
      `
    });

    if (result.success) {
      // Bestätigungs-E-Mail an den Abonnenten
      await sendMail({
        to: email,
        subject: 'Willkommen beim Meliax Newsletter!',
        text: `
          Hallo!

          Vielen Dank für deine Anmeldung zum Meliax Newsletter!
          
          Du wirst ab jetzt regelmäßig Updates und exklusive Einblicke von uns erhalten.
          
          Mit besten Grüßen
          Dein Meliax-Team
        `,
        html: `
          <h2 style="color: #e3cbaa;">Willkommen beim Meliax Newsletter!</h2>
          <p>Hallo!</p>
          <p>Vielen Dank für deine Anmeldung zum Meliax Newsletter!</p>
          <p>Du wirst ab jetzt regelmäßig Updates und exklusive Einblicke von uns erhalten.</p>
          <br>
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