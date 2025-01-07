// pages/api/admin/settings.js
import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

// Initialisiere Supabase mit Service Role Key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function handler(req, res) {
  try {
    // GET Request
    if (req.method === 'GET') {
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
    }

    // POST Request
    if (req.method === 'POST') {
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
    }

    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  } catch (error) {
    console.error('API Fehler:', error);
    return res.status(500).json({ 
      message: 'Interner Server Fehler',
      error: error.message 
    });
  }
}

export default withAuth(handler);