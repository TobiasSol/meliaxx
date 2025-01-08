// pages/api/admin/videos.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // Fehlerbehandlung für fehlende Datenbankverbindung
    if (!supabase) {
      return res.status(500).json({
        error: 'Keine Datenbankverbindung möglich'
      });
    }

    const { data, error } = await supabase
      .from('videos')
      .select('*');

    if (error) {
      throw error;
    }

    // Wenn keine Daten verfügbar, senden Sie ein leeres Array
    if (!data) {
      return res.status(200).json([]);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Interner Serverfehler',
      details: error.message
    });
  }
}