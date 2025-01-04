import nodemailer from 'nodemailer';

// Nodemailer Transporter konfigurieren
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    // E-Mail senden
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Neue Kontaktanfrage: ${subject}`,
      text: message,
      html: `
        <h2>Neue Kontaktanfrage von der Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ message: 'Nachricht erfolgreich gesendet' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ message: 'Fehler beim Senden der Nachricht' });
  }
} 