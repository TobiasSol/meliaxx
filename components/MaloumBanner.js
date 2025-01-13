import { useState, useEffect } from 'react';
import Image from 'next/image';

const MaloumBanner = ({ ofBannerVisible }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleBanner = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Pfeil-Button mit Maloum Logo */}
      <button
        onClick={toggleBanner}
        className={`fixed right-0 md:right-[3%] md:top-[40%] max-[768px]:hidden md:-translate-y-1/3 z-50 bg-black border-2 border-[#e3cbaa] text-[#e3cbaa] rounded-l-lg hover:bg-[#e3cbaa] hover:text-black transition-all duration-300 flex items-center gap-3 pl-4 pr-3 py-3 ${
          isVisible ? 'hidden' : 'block'
        }`}
      >
        {/* Pfeil Icon - nach links zeigend */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 md:h-10 md:w-10 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>

        {/* Maloum Logo */}
        <div className="relative w-24 md:w-32 h-8 md:h-10">
          <Image
            src="/OFbanner/maloum.png"
            alt="Maloum Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </button>

      {/* Banner */}
      <div
        className={`fixed right-[3%] md:top-[40%] max-[768px]:hidden -translate-y-1/3 z-50 transition-all duration-700 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-[105%]'
        }`}
      >
        <div className="relative">
          {/* Schließen Button - links statt rechts */}
          <button 
            onClick={toggleBanner}
            className="absolute -left-10 -top-10 max-[460px]:left-[80px] max-[460px]:top-[0px] w-8 h-8 max-[460px]:w-6 max-[460px]:h-6 rounded-full bg-black border-2 border-[#e3cbaa] text-[#e3cbaa] flex items-center justify-center hover:bg-[#e3cbaa] hover:text-black transition-all duration-300 group z-50"
          >
            <span className="transform group-hover:rotate-180 transition-transform duration-300 text-2xl max-[460px]:text-xl">×</span>
          </button>

          {/* Desktop Neon-Rahmen (nur über 460px) */}
          <div className="max-[460px]:hidden">
            <div className="absolute -inset-1 rounded-l-xl bg-orange-500 opacity-75 blur-md animate-neonBorder" />
            <div className="absolute -inset-1.5 rounded-l-xl bg-orange-400 opacity-50 blur-lg animate-neonBorder" />
            <div className="absolute -inset-2 rounded-l-xl bg-orange-300 opacity-25 blur-xl animate-neonBorder" />
          </div>

          {/* Mobile Container mit Neon-Effekt (nur unter 460px) */}
          <div className="min-[461px]:hidden relative scale-75 origin-top-right">
            <div className="absolute inset-0 rounded-l-xl bg-orange-500 opacity-75 blur-md animate-neonBorder" />
            <div className="absolute inset-0 rounded-l-xl bg-orange-400 opacity-50 blur-lg animate-neonBorder" />
            <div className="absolute inset-0 rounded-l-xl bg-orange-300 opacity-25 blur-xl animate-neonBorder" />
            
            {/* Hauptbanner für Mobile */}
            <div className="relative w-[400px] h-[650px] bg-gradient-to-b from-black via-black to-[#111] rounded-l-xl border-2 border-[#e3cbaa] shadow-2xl p-8 overflow-hidden">
              {/* Glanz-Animation über den gesamten Banner */}
              <div className="absolute inset-0 animate-shine-banner pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(227,203,170,0.1)] to-transparent skew-x-[-45deg] translate-x-[-100%]" />
              </div>

              {/* Dekorative Ecken */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#e3cbaa]" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#e3cbaa]" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#e3cbaa]" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#e3cbaa]" />
              
              {/* Zentrierter oberer Content */}
              <div className="relative z-10 flex flex-col items-center mb-8">
                {/* Oberer Text */}
                <h3 className="text-[#e3cbaa] text-2xl font-bold text-center tracking-wider">
                  JETZT GEILEN SEXCHAT MIT MIR !
                </h3>

                {/* Maloum Logo */}
                <div className="relative w-48 h-16 transform hover:scale-105 transition-transform duration-300 -mt-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3cbaa20] to-transparent animate-shine" />
                  <Image
                    src="/OFbanner/maloum.png"
                    alt="Maloum Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Melia Foto - rechts positioniert und gespiegelt */}
              <div className="absolute right-0 bottom-0 w-[250px] h-[80%]">
                <Image
                  src="/OFbanner/melia.png"
                  alt="Melia"
                  fill
                  className="object-contain object-right-bottom scale-x-[-1]"
                  priority
                />
              </div>
              
              {/* Linker Content */}
              <div className="absolute left-8 top-[35%] w-[180px]">
                {/* Name und Alter in einer Reihe */}
                <div className="text-center mb-0 flex items-baseline justify-center gap-1">
                  <h4 className="text-[#e3cbaa] text-2xl font-bold font-playfair tracking-wider inline-flex items-baseline m-0"
                      style={{
                        textShadow: '0 0 10px rgba(227, 203, 170, 0.5)'
                      }}>
                    MELIAX
                  </h4>
                  <span className="text-[#e3cbaa] text-2xl font-bold leading-none">,</span>
                  <span className="text-[#e3cbaa] text-2xl font-bold leading-none">23</span>
                </div>

                {/* Online Status - rechtsbündig */}
                <div className="flex items-center gap-2 mb-12 justify-start pl-5">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -inset-1 bg-green-400 rounded-full blur-sm animate-pulse"></div>
                  </div>
                  <span className="text-green-500 font-bold text-lg tracking-wider" 
                        style={{
                          textShadow: `
                            0 0 7px #22c55e,
                            0 0 10px #22c55e,
                            0 0 21px #22c55e,
                            0 0 42px #22c55e
                          `
                        }}>
                    ONLINE
                  </span>
                </div>

                {/* Rabatt Text mit Zusatzinfo */}
                <div className="transform rotate-[5deg] relative">
                  <div className="absolute inset-0 bg-[#e3cbaa] blur-md opacity-20" />
                  <div className="flex flex-col items-center">
                    <div className="relative bg-gradient-to-r from-[#e3cbaa] via-[#d0b48f] to-[#e3cbaa] text-black py-2 px-4 rounded-lg text-lg font-bold shadow-xl whitespace-nowrap mb-2">
                      Jetzt 60% günstiger!
                    </div>
                    <span className="text-[#e3cbaa] text-sm font-semibold tracking-wide">
                      Nur Kreditkarte
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Button mit Glanz-Animation */}
              <div className="absolute right-[47%] bottom-20 w-[260px]">
                <a 
                  href="https://tinyurl.com/3zht9dfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-transparent border-2 border-[#e3cbaa] text-[#e3cbaa] hover:text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-base group inline-flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-[#e3cbaa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10">JETZT CHATTEN</span>
                  {/* Glanz-Animation */}
                  <div className="absolute inset-0 animate-shine-button">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] translate-x-[-100%]" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Banner (nur über 460px) */}
          <div className="max-[460px]:hidden relative w-[400px] h-[650px] bg-gradient-to-b from-black via-black to-[#111] rounded-l-xl border-2 border-[#e3cbaa] shadow-2xl p-8 overflow-hidden">
            {/* Glanz-Animation über den gesamten Banner */}
            <div className="absolute inset-0 animate-shine-banner pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(227,203,170,0.1)] to-transparent skew-x-[-45deg] translate-x-[-100%]" />
            </div>

            {/* Dekorative Ecken */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#e3cbaa]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#e3cbaa]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#e3cbaa]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#e3cbaa]" />
            
            {/* Zentrierter oberer Content */}
            <div className="relative z-10 flex flex-col items-center mb-8">
              {/* Oberer Text */}
              <h3 className="text-[#e3cbaa] text-2xl font-bold text-center tracking-wider">
                JETZT GEILEN SEXCHAT MIT MIR !
              </h3>

              {/* Maloum Logo */}
              <div className="relative w-48 h-16 transform hover:scale-105 transition-transform duration-300 -mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3cbaa20] to-transparent animate-shine" />
                <Image
                  src="/OFbanner/maloum.png"
                  alt="Maloum Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Melia Foto - rechts positioniert und gespiegelt */}
            <div className="absolute right-0 bottom-0 w-[250px] h-[80%]">
              <Image
                src="/OFbanner/melia.png"
                alt="Melia"
                fill
                className="object-contain object-right-bottom scale-x-[-1]"
                priority
              />
            </div>
            
            {/* Linker Content */}
            <div className="absolute left-8 top-[35%] w-[180px]">
              {/* Name und Alter in einer Reihe */}
              <div className="text-center mb-0 flex items-baseline justify-center gap-1">
                <h4 className="text-[#e3cbaa] text-2xl font-bold font-playfair tracking-wider inline-flex items-baseline m-0"
                    style={{
                      textShadow: '0 0 10px rgba(227, 203, 170, 0.5)'
                    }}>
                  MELIAX
                </h4>
                <span className="text-[#e3cbaa] text-2xl font-bold leading-none">,</span>
                <span className="text-[#e3cbaa] text-2xl font-bold leading-none">23</span>
              </div>

              {/* Online Status - rechtsbündig */}
              <div className="flex items-center gap-2 mb-12 justify-start pl-5">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -inset-1 bg-green-400 rounded-full blur-sm animate-pulse"></div>
                </div>
                <span className="text-green-500 font-bold text-lg tracking-wider" 
                      style={{
                        textShadow: `
                          0 0 7px #22c55e,
                          0 0 10px #22c55e,
                          0 0 21px #22c55e,
                          0 0 42px #22c55e
                        `
                      }}>
                  ONLINE
                </span>
              </div>

              {/* Rabatt Text mit Zusatzinfo */}
              <div className="transform rotate-[5deg] relative">
                <div className="absolute inset-0 bg-[#e3cbaa] blur-md opacity-20" />
                <div className="flex flex-col items-center">
                  <div className="relative bg-gradient-to-r from-[#e3cbaa] via-[#d0b48f] to-[#e3cbaa] text-black py-2 px-4 rounded-lg text-lg font-bold shadow-xl whitespace-nowrap mb-2">
                    Jetzt 60% günstiger!
                  </div>
                  <span className="text-[#e3cbaa] text-sm font-semibold tracking-wide">
                    PAYPAL
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Button mit Glanz-Animation */}
            <div className="absolute right-[27%] bottom-20 w-[260px]">
              <a 
                href="https://tinyurl.com/3zht9dfw"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-transparent border-2 border-[#e3cbaa] text-[#e3cbaa] hover:text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-base group inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[#e3cbaa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10">JETZT CHATTEN</span>
                {/* Glanz-Animation */}
                <div className="absolute inset-0 animate-shine-button">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] translate-x-[-100%]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaloumBanner; 