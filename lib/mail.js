import nodemailer from 'nodemailer';

// Gmail SMTP Transporter
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true für 465, false für andere Ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Hilfsfunktion zum Senden von E-Mails
export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: '"Meliax" <kontakt@meliaxx.de>', // Geändert zu deiner Domain-E-Mail
      replyTo: 'kontakt@meliaxx.de',         // Fügt Reply-To Header hinzu
      sender: process.env.GMAIL_USER,         // Technischer Absender für SMTP
      to,
      subject,
      text,
      html,
      headers: {
        'X-Priority': '3',                    // Normale Priorität
        'X-Mailer': 'Meliax Contact Form'     // Identifiziert dein Mailsystem
      }
    });
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}