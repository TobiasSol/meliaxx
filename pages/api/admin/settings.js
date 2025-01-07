import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: { 
        'X-My-Custom-Header': 'my-app-name',
      },
    }
  }
);

async function handler(req, res) {
  console.log('Settings API called');
  console.log('Using Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Service Role Key available:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('settings')
      .select('count')
      .single();
      
    if (testError) {
      console.error('Connection test failed:', testError);
      throw testError;
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    console.log('Query result:', { data, error });

    if (error) throw error;

    return res.status(200).json(data || {
      id: 1,
      passwordprotectionenabled: false,
      preloaderenabled: true,
      sitepassword: ''
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      message: 'Interner Server Fehler',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default withAuth(handler);