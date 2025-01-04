import { useState } from 'react';
import Image from 'next/image';

function VideoSection({ videos = [] }) {
  console.log('VideoSection received videos:', videos); // Debug-Ausgabe
  
  const [previewVideo, setPreviewVideo] = useState(null);

  // Video-Preview behandeln
  const handlePreviewEnd = () => {
    setPreviewVideo(null);
  };

  return (
    <section className="mb-28 text-center" id="videos">
      <h2 className="text-3xl font-bold text-[#e3cbaa] mb-8">
        Meine Videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.isArray(videos) && videos.map((video) => (
          <div 
            key={video.id}
            className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative aspect-video border-4 border-[#e3cbaa] rounded-lg overflow-hidden">
              <Image
                src={video.thumbnail_url || '/videos/placeholder-thumbnail.jpg'}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-[#e3cbaa] text-xl font-bold mb-2">
                {video.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {video.description}
              </p>
              {video.preview_url && (
                <button 
                  onClick={() => setPreviewVideo(video.preview_url)}
                  className="bg-[#e3cbaa] text-black px-4 py-2 rounded-lg hover:bg-[#d0b48f] transition-colors"
                >
                  Preview
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
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
              onEnded={handlePreviewEnd}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export { VideoSection };