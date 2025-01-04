// utils/supabase-client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Fehlende Supabase Umgebungsvariablen')
}

// Client für öffentliche Anfragen (mit ANON Key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client für Admin-Anfragen (mit Service Key)
export const adminSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Hilfsfunktion zum Prüfen der Verbindung
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) throw error;
    console.log('Supabase Verbindung erfolgreich:', !!data);
    return true;
  } catch (error) {
    console.error('Supabase Verbindungsfehler:', error);
    return false;
  }
}