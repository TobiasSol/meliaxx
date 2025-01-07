import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function handler(req, res) {
  console.log('Settings API called');
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }

    return res.status(200).json(data || {
      passwordprotectionenabled: false,
      preloaderenabled: true
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Interner Server Fehler',
      error: error.message 
    });
  }
}

export default withAuth(handler);