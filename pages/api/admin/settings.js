import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

// Debug-Logs für die Umgebungsvariablen
console.log('API Route Environment:', {
  hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      fetch: fetch.bind(globalThis)
    }
  }
);

async function handler(req, res) {
  try {
    // Test die Verbindung
    console.log('Testing Supabase connection...');
    const { error: testError } = await supabase.auth.getSession();
    
    if (testError) {
      console.error('Connection test failed:', testError);
      throw testError;
    }

    console.log('Connection test successful');

    switch (req.method) {
      case 'GET':
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('id', 1)
          .single();

        console.log('Query result:', { data, error });

        if (error) {
          console.error('Query error:', error);
          throw error;
        }

        // Fallback wenn keine Daten
        const settings = data || {
          id: 1,
          passwordprotectionenabled: false,
          preloaderenabled: true,
          sitepassword: ''
        };

        return res.status(200).json(settings);

      // ... rest of the code
    }
  } catch (error) {
    console.error('Full error:', error);
    return res.status(500).json({ 
      message: 'Interner Server Fehler',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        details: error.details
      } : undefined
    });
  }
}

export default withAuth(handler);