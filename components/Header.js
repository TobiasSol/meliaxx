import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTwitch, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Header() {
  const [isLive, setIsLive] = useState(false);
  const [showChatButton, setShowChatButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch('/api/twitch-status');
        if (response.ok) {
          const data = await response.json();
          setIsLive(data.isLive);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Twitch-Status:', error);
        setIsLive(false); // Setze auf false im Fehlerfall
      }
    };

    // Initial check
    checkTwitchStatus();

    // Überprüfe alle 5 Minuten
    const interval = setInterval(checkTwitchStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Timer für den Chat-Button
    const timer = setTimeout(() => {
      setShowChatButton(true);
    }, 15000); // 15 Sekunden

    return () => clearTimeout(timer); // Cleanup
  }, []); // Läuft nur einmal beim Mounting

  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 animate-fadeIn">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-coterie text-[#e3cbaa]">
          Meliax
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#e3cbaa] p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {showChatButton && (
              <div className="flex items-center space-x-4">
                <Link 
                  href="https://www.twitch.tv"
                  className="text-base px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-400/50 
                           text-green-400 font-medium hover:bg-green-500/20 transition-all duration-300"
                >
                  Live Chat mit Meliax
                </Link>
                <Link 
                  href="https://www.twitch.tv/"
                  className="text-base px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-400/50 
                           text-green-400 font-medium hover:bg-green-500/20 transition-all duration-300"
                >
                  Live auf Twitch
                </Link>
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/livecam" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                Livecam
              </Link>
              <Link 
                href="#calculator" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                Custom Content
                </Link>

              

              <Link 
                href="#videos" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                Videos
              </Link>
              <Link 
                href="#shop" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                Shop
              </Link>
              <Link 
                href="#wishlist" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                Wishlist
              </Link>
              <Link 
                href="https://www.twitch.tv" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-2"
              >
                <FaTwitch size={20} />
       
              </Link>
              <Link 
                href="https://x.com/me_lia_x" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-2"
              >
                <FaTwitter size={20} />
              
              </Link>
              <Link 
                href="https://www.instagram.com/me.lia.x" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-2"
              >
                <FaInstagram size={20} />
            
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {showChatButton && (
                <>
                  <Link 
                    href="https://www.twitch.tv/"
                    className="text-base text-center px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-400/50 
                             text-green-400 font-medium hover:bg-green-500/20 transition-all duration-300"
                  >
                    Live Chat mit Emma
                  </Link>
                  <Link 
                    href="https://www.twitch.tv/"
                    className="text-base text-center px-4 py-1.5 bg-red-500/10 rounded-lg border border-red-400/50 
                             text-red-400 font-medium hover:bg-red-500/20 transition-all duration-300"
                  >
                    Live auf Twitch
                  </Link>
                </>
              )}
              
              <Link 
                href="/livecam" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center"
              >
                Livecam
              </Link>
              <Link 
                href="#calculator" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center"
              >
                Custom Content
              </Link>


              <Link 
                href="#videos" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center"
              >
                Meine Videos
              </Link>
              <Link 
                href="#shop" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center"
              >
                Shop
              </Link>
              <Link 
                href="#wishlist" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center"
              >
                Wishlist
              </Link>


              <Link 
                href="https://www.twitch.tv/" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center flex items-center justify-center gap-2"
              >
                <FaTwitch size={20} />
                Twitch
              </Link>
              <Link 
                href="https://twitter.com/" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center flex items-center justify-center gap-2"
              >
                <FaTwitter size={20} />
                Twitter
              </Link>
              <Link 
                href="https://www.instagram.com/me.lia.x" 
                className="text-lg font-medium text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-[#e3cbaa]/20
                           px-3 py-2 rounded-lg hover:bg-[#e3cbaa]/5 text-center flex items-center justify-center gap-2"
              >
                <FaInstagram size={20} />
                Instagram
              </Link>


            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 