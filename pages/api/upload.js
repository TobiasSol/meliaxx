// pages/api/upload.js
import formidable from 'formidable';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({});
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // In der neuen Version ist files ein Objekt mit Arrays
    const fileArray = Object.values(files)[0];
    if (!fileArray || !fileArray[0]) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const file = fileArray[0];
    console.log('File received:', file);

    // Dateiname aus dem originalen Dateinamen extrahieren
    const originalName = file.originalFilename || file.newFilename || 'upload';
    const fileExt = originalName.split('.').pop() || '';
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${fields.path || 'uploads'}/${fileName}`;

    // Datei einlesen
    const fileBuffer = await fs.readFile(file.filepath);

    // Upload zu Supabase
    const { data, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, fileBuffer, {
        contentType: file.mimetype || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    // Öffentliche URL generieren
    const { data: urlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    // Temporäre Datei aufräumen
    await fs.unlink(file.filepath);

    return res.status(200).json({
      success: true,
      data: data,
      publicUrl: urlData.publicUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}