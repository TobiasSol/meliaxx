import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Edit, PlayCircle, Upload } from 'lucide-react';

// Client-side Supabase instance mit ANON key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewVideoFile, setPreviewVideoFile] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/videos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setVideos(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, directory) => {
    try {
      // FormData erstellen
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', directory);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
  
      const data = await response.json();
      return data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      let thumbnailUrl = '';
      let videoUrl = '';
      let previewUrl = '';

      if (thumbnail) {
        thumbnailUrl = await handleFileUpload(thumbnail, 'thumbnails');
      }

      if (video) {
        videoUrl = await handleFileUpload(video, 'videos');
      }

      if (previewVideoFile) {
        previewUrl = await handleFileUpload(previewVideoFile, 'previews');
      }

      const videoData = {
        title,
        description,
        price: parseFloat(price),
        ...(thumbnailUrl && { thumbnail_url: thumbnailUrl }),
        ...(videoUrl && { video_url: videoUrl }),
        ...(previewUrl && { preview_url: previewUrl })
      };

      const url = editingVideo 
        ? `/api/admin/videos/${editingVideo.id}`
        : '/api/admin/videos';

      const response = await fetch(url, {
        method: editingVideo ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(videoData)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Videos');
      }

      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setThumbnail(null);
      setVideo(null);
      setPreviewVideoFile(null);
      setEditingVideo(null);

      // Refresh video list
      fetchVideos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    if (!confirm('Soll dieses Video wirklich gelöscht werden?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Videos');
      }

      fetchVideos();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setDescription(video.description);
    setPrice(video.price.toString());
  };

  if (loading) return <div className="p-4">Laden...</div>;
  if (error) return <div className="p-4 text-red-500">Fehler: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Video Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-[#e3cbaa] mb-4">
          {editingVideo ? 'Video bearbeiten' : 'Neues Video hinzufügen'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#d0b48f] mb-2">Titel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#d0b48f] mb-2">Preis (€)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#d0b48f] mb-2">Beschreibung</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#d0b48f] mb-2">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-[#d0b48f] mb-2">Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-[#d0b48f] mb-2">Preview Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setPreviewVideoFile(e.target.files[0])}
              className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          {editingVideo && (
            <button
              type="button"
              onClick={() => setEditingVideo(null)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Abbrechen
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#d0b48f] text-black rounded hover:bg-[#e3cbaa] disabled:opacity-50"
          >
            {loading ? 'Speichern...' : editingVideo ? 'Aktualisieren' : 'Hinzufügen'}
          </button>
        </div>
      </form>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-900 rounded-lg overflow-hidden">
            {video.thumbnail_url && (
              <div className="aspect-video relative">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-[#e3cbaa]">{video.title}</h3>
              <p className="text-gray-400">{video.description}</p>
              <p className="text-[#d0b48f] font-bold">{video.price.toFixed(2)} €</p>
              
              <div className="flex justify-end space-x-2">
                {video.preview_url && (
                  <button
                    onClick={() => setPreviewVideo(video.preview_url)}
                    className="p-2 text-[#d0b48f] hover:text-[#e3cbaa]"
                  >
                    <PlayCircle size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleEdit(video)}
                  className="p-2 text-[#d0b48f] hover:text-[#e3cbaa]"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="p-2 text-red-500 hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setPreviewVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#e3cbaa]"
            >
              Schließen
            </button>
            <video
              src={previewVideo}
              controls
              autoPlay
              className="w-full"
              onEnded={() => setPreviewVideo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}