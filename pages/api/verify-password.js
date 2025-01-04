import { createClient } from '@supabase/supabase-js';

// Initialisiere Supabase mit Service Key für Admin-Zugriff
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    const { data: settings, error } = await supabase
      .from('settings')
      .select('passwordprotectionenabled, sitepassword')
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw error;
    }

    // Wenn Passwortschutz deaktiviert ist oder kein Passwort gesetzt ist
    if (!settings?.passwordprotectionenabled || !settings?.sitepassword) {
      return res.status(200).json({ success: true });
    }

    // Passwortvergleich
    const isValidPassword = password === settings.sitepassword;
    
    if (isValidPassword) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ 
      success: false,
      message: 'Ungültiges Passwort' 
    });

  } catch (error) {
    console.error('Fehler bei der Passwortüberprüfung:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Interner Server-Fehler' 
    });
  }
}