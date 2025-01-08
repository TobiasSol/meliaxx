// pages/api/check-protection.js
import { createClient } from '@supabase/supabase-js'

// Hole die Umgebungsvariablen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Überprüfung der Umgebungsvariablen
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase Umgebungsvariablen fehlen. Bitte überprüfen Sie ihre .env.local Datei');
}

// Erstelle den Supabase-Client mit zusätzlichen Optionen
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false // Verhindert Session-Probleme
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: { 'x-my-custom-header': 'meliax-app' },
    fetch: fetch // Expliziter fetch für Node.js Umgebung
  }
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Timeout nach 5 Sekunden
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout bei Supabase-Anfrage')), 5000)
    );

    const fetchPromise = supabase
      .from('settings')
      .select('passwordprotectionenabled')
      .single();

    // Race zwischen Timeout und tatsächlicher Anfrage
    const { data: settings, error } = await Promise.race([
      fetchPromise,
      timeoutPromise
    ]);

    if (error) {
      console.error('Supabase Fehler:', error);
      return res.status(500).json({ 
        error: 'Datenbankfehler',
        passwordProtectionEnabled: false 
      });
    }

    return res.status(200).json({ 
      passwordProtectionEnabled: settings?.passwordprotectionenabled || false 
    });

  } catch (error) {
    console.error('Error checking protection status:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal Server Error',
      passwordProtectionEnabled: false 
    });
  }
}