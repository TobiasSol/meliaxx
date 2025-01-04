// pages/api/admin/login.js
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    // Überprüfen der Anmeldedaten gegen die Umgebungsvariablen
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // JWT Token erstellen
      const token = sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({ token });
    }

    // Ungültige Anmeldedaten
    return res.status(401).json({ 
      message: 'Benutzername oder Passwort falsch' 
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ 
      message: 'Ein interner Fehler ist aufgetreten' 
    });
  }
}