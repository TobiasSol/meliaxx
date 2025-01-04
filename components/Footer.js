import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitch, Twitter } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    // Newsletter Logic hier implementieren
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white border-[#d0b48f]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail Adresse"
                  className="flex-1 px-4 py-2 bg-black border border-[#d0b48f] rounded"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d0b48f] text-black rounded hover:bg-[#e3cbaa]"
                >
                  Anmelden
                </button>
              </div>
            </form>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitch.tv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                <Twitch size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold text-[#e3cbaa] mb-4">Rechtliches</h3>
            <div className="space-y-2">
              <Link
                href="/impressum"
                className="block text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="block text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="block text-[#d0b48f] hover:text-[#e3cbaa]"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-[#d0b48f]">
          © {new Date().getFullYear()} Meliax. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
} 