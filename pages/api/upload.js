import { supabase } from '../../lib/supabaseClient';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { file, path } = req.body

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    return res.status(200).json({ data })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ error: 'Error uploading file' })
  }
} 