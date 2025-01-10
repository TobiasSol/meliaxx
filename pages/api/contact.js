import { sendMail } from '../../lib/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    const result = await sendMail({
      to: process.env.CONTACT_EMAIL, // kontakt@meliaxx.de
      subject: `Neue Kontaktanfrage: ${subject}`,
      text: `
        Name: ${name}
        E-Mail: ${email}
        Betreff: ${subject}
        Nachricht: ${message}
      `,
      html: `
        <h2>Neue Kontaktanfrage von der Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (result.success) {
      // Bestätigungs-E-Mail an den Absender
      await sendMail({
        to: email,
        subject: 'Ihre Nachricht wurde empfangen',
        text: `
          Hallo ${name},

          vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.

          Mit freundlichen Grüßen
          Das Meliax-Team
        `,
        html: `
          <h2>Vielen Dank für Ihre Nachricht</h2>
          <p>Hallo ${name},</p>
          <p>wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.</p>
          <p>
            Mit freundlichen Grüßen<br>
            Das Meliax-Team
          </p>
        `
      });

      res.status(200).json({ message: 'Nachricht erfolgreich gesendet' });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ message: 'Fehler beim Senden der Nachricht' });
  }
}