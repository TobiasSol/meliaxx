import { sendMail } from '../../lib/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { duration, is4K, extras, language, setting, videoType, deliveryTime, appreciation, totalPrice } = req.body;

  try {
    const result = await sendMail({
      to: process.env.CONTACT_EMAIL,
      subject: 'Neue Custom Video Anfrage',
      html: `
        <h2>Neue Custom Video Anfrage</h2>
        <h3>Details:</h3>
        <ul>
          <li><strong>Dauer:</strong> ${duration} Minuten</li>
          <li><strong>Auflösung:</strong> ${is4K ? '4K' : 'Full HD 1080p'}</li>
          <li><strong>Sprache:</strong> ${language}</li>
          <li><strong>Location:</strong> ${setting}</li>
          <li><strong>Video-Typ:</strong> ${videoType}</li>
          <li><strong>Lieferzeit:</strong> ${deliveryTime}</li>
          <li><strong>Extras:</strong> ${extras.join(', ')}</li>
          ${appreciation ? `<li><strong>Appreciation:</strong> ${appreciation}</li>` : ''}
        </ul>
        <p><strong>Gesamtpreis:</strong> ${totalPrice}€</p>
        <p>Zeitpunkt der Anfrage: ${new Date().toLocaleString('de-DE')}</p>
      `,
    });

    if (result.success) {
      res.status(200).json({ message: 'Anfrage erfolgreich gesendet' });
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Video request error:', error);
    res.status(500).json({ message: 'Fehler beim Senden der Anfrage' });
  }
}