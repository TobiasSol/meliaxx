import { useState, useEffect } from "react";
import Header from "../components/Header";
import { VideoSection } from "../components/VideoSection";
import VideoCalculator from "../components/VideoCalculator";
import InstagramFeed from "../components/InstagramFeed";
import Footer from "../components/Footer";
import Image from 'next/image';

export default function Home() {
  const [purchasedVideos, setPurchasedVideos] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [adminVideos, setAdminVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminVideos();
  }, []);

  const fetchAdminVideos = async () => {
    try {
      const response = await fetch('/api/admin/videos');
      if (response.ok) {
        const data = await response.json();
        setAdminVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPurchase = async (videoId) => {
    try {
      const response = await fetch('/api/video-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
      });

      if (response.ok) {
        setPurchasedVideos([...purchasedVideos, videoId]);
        const downloadButton = document.querySelector(`#download-${videoId}`);
        if (downloadButton) {
          downloadButton.classList.remove('cursor-not-allowed', 'bg-gray-800');
          downloadButton.classList.add('bg-[#e3cbaa]', 'hover:bg-[#d0b48f]');
          downloadButton.disabled = false;
        }
      }
    } catch (error) {
      console.error('Fehler beim Kauf:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  const handlePreviewEnd = () => {
    setPreviewVideo(null);
  };

  const shopArticles = [
    {
      id: 1,
      title: "Getragene Socken",
      price: "39,99 €",
      image: "/videos/meliaxsocken.jpg",
      description: "3 Tage getragene Socken"
    },
    {
      id: 2,
      title: "Getragener String",
      price: "59,99 €",
      image: "/videos/meliaxsocken.jpg",
      description: "24 Stunden getragener String"
    },
    {
      id: 3,
      title: "Polaroid Set",
      price: "99,99 €",
      image: "/videos/meliaxsocken.jpg",
      description: "5 handgeschriebene Polaroid Fotos"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white mt-12">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-28 text-center relative h-screen">
          <div className="absolute inset-2 border-4 border-[#e3cbaa]/30 rounded-lg z-20" />
          <div 
            className="absolute inset-0 bg-[url('/videos/header.jpg')] bg-cover bg-center w-full h-full"
            style={{
              backgroundImage: "url('/videos/meliax.avif')",
              filter: "brightness(0.3)"
            }}
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-evogria text-[#e3cbaa] mb-4">
              MELIAX
            </h1>
            <p className="text-xl font-coterie text-[#d0b48f]">
              Content Creator & Digital Artist
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-28 text-center" id="videos">
          <h2 className="text-3xl font-bold text-[#e3cbaa] mb-8">
            Meine Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adminVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-video border-4 border-[#e3cbaa] rounded-lg overflow-hidden">
                  <Image
                    src={video.thumbnail_url || "/videos/placeholder.jpg"}
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
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#e3cbaa] text-xl font-bold">
                      {video.price.toFixed(2)} €
                    </span>
                    <div className="flex gap-2">
                      {video.preview_url && (
                        <button 
                          onClick={() => setPreviewVideo(video.preview_url)}
                          className="bg-[#e3cbaa] text-black px-4 py-2 rounded-lg hover:bg-[#d0b48f] transition-colors"
                        >
                          Preview
                        </button>
                      )}
                      <button 
                        className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
                        disabled={!purchasedVideos.includes(video.id)}
                        title={!purchasedVideos.includes(video.id) ? "Erst nach dem Kauf verfügbar" : ""}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleVideoPurchase(video.id)}
                        className="bg-[#e3cbaa] text-black px-4 py-2 rounded-lg hover:bg-[#d0b48f] transition-colors font-bold"
                      >
                        Kaufen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Calculator Section */}
        <section className="mb-24 pt-2 mx-auto text-center" id="calculator">
          <VideoCalculator />
        </section>

        {/* Shop Section */}
        <section className="mb-48 text-center" id="shop">
          <h2 className="text-3xl font-bold text-[#e3cbaa] mb-8">
            Shop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shopArticles.map((product) => (
              <div 
                key={product.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-[4/3] border-4 border-[#e3cbaa] rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-[#e3cbaa] text-xl font-bold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#e3cbaa] text-xl font-bold">
                      {product.price}
                    </span>
                    <button className="bg-[#e3cbaa] text-black px-4 py-2 rounded-lg hover:bg-[#d0b48f] transition-colors font-bold">
                      Kaufen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wishlist Section */}
        <section className="mb-28 text-center" id="wishlist">
          <h2 className="text-3xl font-bold text-[#e3cbaa] mb-8">
            Wishlist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Louboutin High Heels",
                price: "745,00 €",
                image: "/videos/blindfold-harness-and-ball-gag-194871.png",
                link: "https://example.com/heels"
              },
              {
                id: 2,
                title: "Victoria's Secret Set",
                price: "199,99 €",
                image: "/videos/blindfold-harness-and-ball-gag-194871.png",
                link: "https://example.com/lingerie"
              },
              {
                id: 3,
                title: "Gucci Handtasche",
                price: "2.199,00 €",
                image: "/videos/blindfold-harness-and-ball-gag-194871.png",
                link: "https://example.com/bag"
              }
            ].map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-[4/4] border-4 border-[#e3cbaa] rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-[#e3cbaa] text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#e3cbaa] text-xl font-bold">
                      {item.price}
                    </span>
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#e3cbaa] text-black px-4 py-2 rounded-lg hover:bg-[#d0b48f] transition-colors font-bold"
                    >
                      Schenken
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-[#e3cbaa] mb-8">
            Aktuelle Posts
          </h2>
          <InstagramFeed />
        </section>
      </main>

      <Footer />

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
    </div>
  );
}