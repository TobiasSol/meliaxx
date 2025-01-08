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
          <Link href="/" className="text-3xl font-playfair text-[#e3cbaa]">
          MELIAX
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
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {showChatButton && (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link 
                  href="https://www.twitch.tv"
                  className="text-sm lg:text-base xl:text-lg px-2 lg:px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-400/50 
                           text-green-400 font-medium hover:bg-green-500/20 transition-all duration-300"
                >
                  LIVECHAT 
                </Link>
               
              </div>
            )}
            
            <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              <Link 
                href="/livecam" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                LIVECAM
              </Link>
              <Link 
                href="/#calculator" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                CUSTOM CONTENT
              </Link>
              <Link 
                href="/#videos" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                VIDEOS
              </Link>
              <Link 
                href="/#shop" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                SHOP
              </Link>
              <Link 
                href="/#wishlist" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5"
              >
                WISHLIST
              </Link>
              <Link 
                href="https://www.twitch.tv" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-1 lg:gap-2"
              >
                <FaTwitch className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
              <Link 
                href="https://x.com/me_lia_x" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-1 lg:gap-2"
              >
                <FaTwitter className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/me.lia.x" 
                className="text-sm lg:text-base xl:text-xl font-playfair text-[#d0b48f] hover:text-[#e3cbaa] transition-all duration-300
                           hover:scale-110 hover:shadow-lg hover:shadow-[#e3cbaa]/20 
                           px-2 lg:px-3 py-1 rounded-lg hover:bg-[#e3cbaa]/5 flex items-center gap-1 lg:gap-2"
              >
                <FaInstagram className="w-4 h-4 lg:w-5 lg:h-5" />
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
                    LIVE CHAT MIT MELIAX
                  </Link>
                  <Link 
                    href="https://www.twitch.tv/"
                    className="text-base text-center px-4 py-1.5 bg-red-500/10 rounded-lg border border-red-400/50 
                             text-red-400 font-medium hover:bg-red-500/20 transition-all duration-300"
                  >
                    LIVE AUF TWITCH
                  </Link>
                </>
              )}
              
              <Link href="/livecam">LIVECAM</Link>
              <Link href="/#calculator">CUSTOM CONTENT</Link>
              <Link href="/#videos">VIDEOS</Link>
              <Link href="/#shop">SHOP</Link>
              <Link href="/#wishlist">WISHLIST</Link>
              <Link href="https://www.twitch.tv/">TWITCH</Link>
              <Link href="https://twitter.com/">TWITTER</Link>
              <Link href="https://www.instagram.com/me.lia.x">INSTAGRAM</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 