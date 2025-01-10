import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'kontakt@meliaxx.de', // Deine Hostinger E-Mail
    pass: process.env.EMAIL_PASSWORD // Hostinger E-Mail-Passwort
  }
});

export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: '"Meliax" <kontakt@meliaxx.de>',
      replyTo: 'kontakt@meliaxx.de',
      to,
      subject,
      text,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}