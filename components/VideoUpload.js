import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client korrekt initialisieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    global: {
      fetch: fetch.bind(globalThis)
    }
  }
);

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadVideo = async (event) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const file = event.target.files[0];
      if (!file) return;

      // Größenbeschränkung prüfen (z.B. 100MB)
      if (file.size > 100 * 1024 * 1024) {
        throw new Error('Datei zu groß (max 100MB)');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      // Upload mit Progress Tracking
      const { error } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(Math.round(percent));
          },
        });

      if (error) throw error;

      // Public URL generieren
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      alert('Video erfolgreich hochgeladen!');
      return urlData.publicUrl;

    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message || 'Fehler beim Upload des Videos!');
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="video/*"
          onChange={uploadVideo}
          disabled={uploading}
          className="bg-black border border-[#d0b48f] rounded p-2 text-white"
        />
        {uploading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#d0b48f] border-t-transparent"></div>
            <span className="text-[#d0b48f]">{uploadProgress}%</span>
          </div>
        )}
      </div>
      {uploading && (
        <div className="w-full bg-gray-900 rounded-full h-2.5">
          <div 
            className="bg-[#d0b48f] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}