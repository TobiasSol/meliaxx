// pages/api/admin/videos.js
import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../utils/withAuth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { data, error: fetchError } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        return res.status(200).json(data);

      case 'POST':
        const { data: insertData, error: insertError } = await supabase
          .from('videos')
          .insert([req.body])
          .select()
          .single();

        if (insertError) throw insertError;
        return res.status(201).json(insertData);

      case 'PUT':
        const videoId = req.query.id;
        const { data: updateData, error: updateError } = await supabase
          .from('videos')
          .update(req.body)
          .eq('id', videoId)
          .select()
          .single();

        if (updateError) throw updateError;
        return res.status(200).json(updateData);

      case 'DELETE':
        const id = req.query.id;
        const { error: deleteError } = await supabase
          .from('videos')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
        return res.status(200).json({ message: 'Video erfolgreich gelöscht' });

      default:
        return res.status(405).json({ message: 'Methode nicht erlaubt' });
    }
  } catch (error) {
    console.error('API Fehler:', error);
    return res.status(500).json({ 
      message: 'Interner Server Fehler',
      error: error.message 
    });
  }
}

export default withAuth(handler);