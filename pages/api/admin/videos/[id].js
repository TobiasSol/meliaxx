// pages/api/admin/videos/[id].js
import { createClient } from '@supabase/supabase-js';
import { withAuth } from '../../../../utils/withAuth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function handler(req, res) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const { data, error: fetchError } = await supabase
          .from('videos')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        return res.status(200).json(data);

      case 'PUT':
        const { data: updateData, error: updateError } = await supabase
          .from('videos')
          .update(req.body)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;
        return res.status(200).json(updateData);

      case 'DELETE':
        // Erst das Video aus der Datenbank löschen
        const { error: deleteError } = await supabase
          .from('videos')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;

        // Optional: Hier könnten wir auch die zugehörigen Dateien aus dem Storage löschen
        // Dies würde weitere Storage-Operationen erfordern

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