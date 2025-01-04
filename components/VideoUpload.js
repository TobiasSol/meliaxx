import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadVideo = async (event) => {
    try {
      setUploading(true)

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `videos/${fileName}`

      const { error } = await supabase.storage
        .from('videos')
        .upload(filePath, file)

      if (error) throw error
      alert('Video erfolgreich hochgeladen!')
    } catch (error) {
      alert('Fehler beim Upload des Videos!')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={uploadVideo}
        disabled={uploading}
      />
      {uploading && <p>Upload läuft...</p>}
    </div>
  )
} 