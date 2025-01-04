import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, X } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGoddess, setShowGoddess] = useState(false);
  const [hideGoddess, setHideGoddess] = useState(false);
  const [showGoldBackground, setShowGoldBackground] = useState(false);
  const [fadeOutEmma, setFadeOutEmma] = useState(false);
  const [fadeOutGold, setFadeOutGold] = useState(false);
  const [fadeOutVideo, setFadeOutVideo] = useState(false);
  const [settings, setSettings] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    // Goldener Hintergrund erscheint nach 1 Sekunde
    const goldTimer = setTimeout(() => {
      setShowGoldBackground(true);
    }, 500);

    // EmmaXschwarz erscheint nach 3 Sekunden
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    // DIE GÖTTIN erscheint nach 7 Sekunden
    const goddessTimer = setTimeout(() => {
      setShowGoddess(true);
    }, 2000);

    // DIE GÖTTIN verschwindet nach 10 Sekunden
    const hideGoddessTimer = setTimeout(() => {
      setHideGoddess(true);
    },3000);

    // EmmaXschwarz beginnt zu verschwinden nach 11 Sekunden
    const fadeOutEmmaTimer = setTimeout(() => {
      setFadeOutEmma(true);
    }, 4000);

    // Goldener Hintergrund verschwindet nach 13 Sekunden
    const fadeOutGoldTimer = setTimeout(() => {
      setFadeOutGold(true);
    }, 5000);

    // Video beginnt nach 12 Sekunden
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 6500);

    return () => {
      clearTimeout(goldTimer);
      clearTimeout(titleTimer);
      clearTimeout(goddessTimer);
      clearTimeout(hideGoddessTimer);
      clearTimeout(fadeOutEmmaTimer);
      clearTimeout(fadeOutGoldTimer);
      clearTimeout(videoTimer);
    };
  }, []);


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);
  
  // Then check settings before rendering:
  if (!settings?.preloaderEnabled) return null;



  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 23000);
      return () => clearTimeout(timer);
    }
  }, [started]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setFadeOutVideo(true);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', () => {
          setFadeOutVideo(true);
        });
      }
    };
  }, []);

  const handleStart = async () => {
    try {
      if (videoRef.current) {
        setStarted(true);
        await videoRef.current.play();
      }
    } catch (error) {
      console.log("Autoplay prevented:", error);
      setMuted(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-black">
      {/* Goldener Hintergrund mit sehr langsamer Animation */}
      <div className={`absolute inset-0 bg-[#d0b48f] transition-all duration-[3000ms] transform
        ${!showGoldBackground 
          ? '-translate-x-full' 
          : fadeOutGold 
            ? 'translate-x-full' 
            : 'translate-x-0'}`} 
      />

      {/* Titel mit "DIE GÖTTIN" */}
      {showTitle && (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
          <div className={`text-black text-4xl md:text-6xl font-playfair transition-opacity duration-3000
            ${!showTitle ? 'opacity-0' : fadeOutEmma ? 'opacity-0' : 'opacity-100'}`}>
            EmmaXschwarz
          </div>
          <div className={`text-black text-2xl md:text-4xl font-playfair transition-opacity duration-2000
            ${!showGoddess ? 'opacity-0' : hideGoddess ? 'opacity-0' : 'opacity-100'}`}>
            DIE GÖTTIN
          </div>
        </div>
      )}

      {/* Video Section mit Fade-Out-Animation */}
      {showVideo && (
        <div className={`relative w-full h-screen transition-opacity duration-3000 
          ${fadeOutVideo ? 'opacity-0' : 'opacity-100'}`}>
          {/* Schließen Button */}
          <button 
            onClick={() => setLoading(false)}
            className="absolute top-4 right-4 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors bg-black/30 flex items-center gap-2"
          >
            <span className="font-playfair">Schließen</span>
            <X size={24} className="text-[#d0b48f]" />
          </button>

          <video
            ref={videoRef}
            loop
            playsInline
            muted={muted}
            className="absolute inset-0 w-full h-full object-fit"
          >
            <source src="/videos/emmavideo.mp4" type="video/mp4" />
            Dein Browser unterstützt keine Videos.
          </video>

          <div className={`absolute inset-0 flex flex-col items-center ${started ? 'bg-black/50' : 'bg-black/80'}`}>
            <div className="flex-1 flex items-center justify-center">
              {!started && (
                <button
                  onClick={handleStart}
                  className="flex items-center font-bold gap-3 px-8 py-4 bg-[#d0b48f] text-black rounded-full hover:bg-[#e3cbaa] transition-colors font-playfair animate-fadeIn"
                >
                  <Play size={24} />
                  <span>Ich will mit EmmaXschwarz spielen !</span>
                </button>
              )}
            </div>
            
            {/* Schließen Button */}
            <div className="mb-8">
              <button 
                onClick={() => setLoading(false)}
                className="flex items-center gap-2 px-6 py-3 bg-black/30 text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="font-playfair">Schließen</span>
                <X size={24} className="text-[#d0b48f]" />
              </button>
            </div>
          </div>
          
          {started && (
            <button 
              onClick={() => {
                setMuted(!muted);
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
              className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors bg-black/30"
            >
              {muted ? (
                <VolumeX size={32} className="text-[#d0b48f]" />
              ) : (
                <Volume2 size={32} className="text-[#d0b48f]" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
} 