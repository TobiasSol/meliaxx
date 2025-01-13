import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTiktok, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Header() {
  const [showChatButton, setShowChatButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Timer für den Chat-Button
    const timer = setTimeout(() => {
      setShowChatButton(true);
    }, 15000); // 15 Sekunden

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 animate-fadeIn border-b border-[#e3cbaa]/20 shadow-lg shadow-black/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-playfair text-[#e3cbaa]">
            MELIAX
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {showChatButton && (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link 
                  href="https://onlyfans.com/meliax/c19"
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
              
              {/* Social Media Icons - Instagram, TikTok, Twitter */}
              <a 
                href="https://www.instagram.com/me.lia.x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa] transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://www.tiktok.com/@me.lia.x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa] transition-colors"
              >
                <FaTiktok size={24} />
              </a>
              <a 
                href="https://twitter.com/me_lia_x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa] transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {showChatButton && (
                <Link 
                  href="https://onlyfans.com/meliax/c19"
                  className="text-base text-center px-4 py-1.5 bg-green-500/10 rounded-lg border border-green-400/50 
                           text-green-400 font-medium hover:bg-green-500/20 transition-all duration-300"
                >
                  LIVECHAT MIT MELIAX
                </Link>
              )}
              
              <Link href="/livecam">LIVECAM</Link>
              <Link href="/#calculator">CUSTOM CONTENT</Link>
              <Link href="/#videos">VIDEOS</Link>
              <Link href="/#shop">SHOP</Link>
              <Link href="/#wishlist">WISHLIST</Link>
              <Link href="https://www.instagram.com/me.lia.x">INSTAGRAM</Link>
              <Link href="https://www.tiktok.com/@me.lia.x">TIKTOK</Link>
              <Link href="https://twitter.com/me_lia_x">TWITTER</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 