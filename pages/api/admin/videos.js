import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

// Debug-Logs für die Umgebungsvariablen
console.log('Video API Route Environment:', {
  hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  url: process.env.NEXT_PUBLIC_SUPABASE_URL
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
  console.log('Videos API called, method:', req.method);

  try {
    // Test die Verbindung zuerst
    console.log('Testing Supabase connection...');
    const { error: testError } = await supabase.auth.getSession();
    
    if (testError) {
      console.error('Connection test failed:', testError);
      throw testError;
    }

    console.log('Connection test successful');

    switch (req.method) {
      case 'GET':
        console.log('Executing GET query...');
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('Query result:', { 
          hasData: !!data, 
          dataLength: data?.length, 
          error 
        });

        if (error) {
          console.error('Query error:', error);
          throw error;
        }

        return res.status(200).json(data || []);

      case 'POST':
        const videoData = req.body;
        console.log('Creating video with:', {
          title: videoData.title,
          hasDescription: !!videoData.description,
          price: videoData.price
        });

        // Validiere die Eingabedaten
        if (!videoData.title || !videoData.price) {
          return res.status(400).json({
            message: 'Titel und Preis sind erforderlich'
          });
        }

        const { data: newVideo, error: createError } = await supabase
          .from('videos')
          .insert([{
            title: videoData.title,
            description: videoData.description,
            price: parseFloat(videoData.price),
            thumbnail_url: videoData.thumbnail_url,
            video_url: videoData.video_url,
            preview_url: videoData.preview_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (createError) {
          console.error('Create error:', createError);
          throw createError;
        }

        return res.status(201).json(newVideo);

      case 'PUT':
        const { id } = req.query;
        const updateData = req.body;
        
        const { data: updatedVideo, error: updateError } = await supabase
          .from('videos')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;
        return res.status(200).json(updatedVideo);

      case 'DELETE':
        const videoId = req.query.id;
        
        const { error: deleteError } = await supabase
          .from('videos')
          .delete()
          .eq('id', videoId);

        if (deleteError) throw deleteError;
        return res.status(200).json({ message: 'Video erfolgreich gelöscht' });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Full API Error:', {
      message: error.message,
      details: error.details,
      hint: error.hint
    });

    return res.status(500).json({
      message: 'Interner Server Fehler',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        details: error.details,
        hint: error.hint
      } : undefined
    });
  }
}

export default withAuth(handler);