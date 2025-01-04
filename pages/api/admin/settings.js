import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../lib/withAuth';

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

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error) throw error;

      return res.status(200).json(data || {
        passwordprotectionenabled: false,
        preloaderenabled: true,
        sitepassword: ''
      });
    } catch (error) {
      console.error('Fehler beim Laden der Einstellungen:', error);
      return res.status(500).json({ message: 'Fehler beim Laden der Einstellungen' });
    }
  }

  if (req.method === 'POST') {
    try {
      const settings = req.body;

      const { data, error } = await supabase
        .from('settings')
        .upsert([{
          id: 1,
          ...settings,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json(data);
    } catch (error) {
      console.error('Fehler beim Speichern der Einstellungen:', error);
      return res.status(500).json({ message: 'Fehler beim Speichern der Einstellungen' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

// Mit Authentifizierung schützen
export default withAuth(handler);