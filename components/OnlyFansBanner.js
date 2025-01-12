import { useState, useEffect } from 'react';
import Image from 'next/image';

const OnlyFansBanner = () => {
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
      {/* Pfeil-Button mit OnlyFans Logo */}
      <button
        onClick={toggleBanner}
        className={`fixed md:left-[5%] md:top-[40%] left-0 top-[80px] md:-translate-y-1/3 z-50 bg-black border-2 border-[#e3cbaa] text-[#e3cbaa] rounded-r-lg hover:bg-[#e3cbaa] hover:text-black transition-all duration-300 flex items-center gap-3 pr-4 pl-3 py-3 ${
          isVisible ? 'hidden' : 'block'
        }`}
      >
        {/* OnlyFans Logo */}
        <div className="relative w-24 md:w-32 h-8 md:h-10">
          <Image
            src="/OFbanner/OnlyFans_logo.png"
            alt="OnlyFans Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Pfeil Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 md:h-10 md:w-10"
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
      </button>

      {/* Banner */}
      <div
        className={`fixed left-[5%] top-[40%] max-[460px]:top-[50%] -translate-y-1/3 z-50 transition-transform duration-700 ease-out ${
          isVisible ? 'translate-x-0' : '-translate-x-[105%]'
        }`}
      >
        <div className="relative">
          {/* Schließen Button */}
          <button 
            onClick={toggleBanner}
            className="absolute -right-10 -top-10 max-[460px]:right-[80px] max-[460px]:top-[0px] w-8 h-8 max-[460px]:w-6 max-[460px]:h-6 rounded-full bg-black border-2 border-[#e3cbaa] text-[#e3cbaa] flex items-center justify-center hover:bg-[#e3cbaa] hover:text-black transition-all duration-300 group z-50"
          >
            <span className="transform group-hover:rotate-180 transition-transform duration-300 text-2xl max-[460px]:text-xl">×</span>
          </button>

          {/* Desktop Neon-Rahmen (nur über 460px) */}
          <div className="max-[460px]:hidden">
            <div className="absolute -inset-1 rounded-r-xl bg-blue-500 opacity-75 blur-md animate-neonBorder" />
            <div className="absolute -inset-1.5 rounded-r-xl bg-blue-400 opacity-50 blur-lg animate-neonBorder" />
            <div className="absolute -inset-2 rounded-r-xl bg-blue-300 opacity-25 blur-xl animate-neonBorder" />
          </div>

          {/* Mobile Container mit Neon-Effekt (nur unter 460px) */}
          <div className="min-[461px]:hidden relative scale-75 origin-top-left">
            <div className="absolute inset-0 rounded-r-xl bg-blue-500 opacity-75 blur-md animate-neonBorder" />
            <div className="absolute inset-0 rounded-r-xl bg-blue-400 opacity-50 blur-lg animate-neonBorder" />
            <div className="absolute inset-0 rounded-r-xl bg-blue-300 opacity-25 blur-xl animate-neonBorder" />
            
            {/* Hauptbanner für Mobile */}
            <div className="relative w-[400px] h-[650px] bg-gradient-to-b from-black via-black to-[#111] rounded-r-xl border-2 border-[#e3cbaa] shadow-2xl p-8">
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

                {/* OF Logo mit Glanz-Effekt */}
                <div className="relative w-48 h-16 transform hover:scale-105 transition-transform duration-300 -mt-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3cbaa20] to-transparent animate-shine" />
                  <Image
                    src="/OFbanner/OnlyFans_logo.png"
                    alt="OnlyFans Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Melia Foto - links positioniert */}
              <div className="absolute left-0 bottom-0 w-[250px] h-[80%]">
                <Image
                  src="/OFbanner/melia.png"
                  alt="Melia"
                  fill
                  className="object-contain object-left-bottom"
                  priority
                />
              </div>
              
              {/* Rechter Content - aufgeteilt in zwei Bereiche */}
              <div className="absolute right-8 top-[45%] w-[180px]">
                {/* Name und Alter in einer Reihe */}
                <div className="text-center mb-4 flex items-baseline justify-center gap-1">
                  <h4 className="text-[#e3cbaa] text-2xl font-bold font-playfair tracking-wider inline-flex items-baseline m-0"
                      style={{
                        textShadow: '0 0 10px rgba(227, 203, 170, 0.5)'
                      }}>
                    MELIAX
                  </h4>
                  <span className="text-[#e3cbaa] text-2xl font-bold leading-none">,</span>
                  <span className="text-[#e3cbaa] text-2xl font-bold leading-none">23</span>
                </div>

                {/* Online Status */}
                <div className="flex items-center justify-center gap-2 mb-6">
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

                {/* Rabatt Text */}
                <div className="transform rotate-[-5deg] relative">
                  <div className="absolute inset-0 bg-[#e3cbaa] blur-md opacity-20" />
                  <div className="relative bg-gradient-to-r from-[#e3cbaa] via-[#d0b48f] to-[#e3cbaa] text-black py-2 px-4 rounded-lg text-lg font-bold shadow-xl whitespace-nowrap">
                    Jetzt 70% günstiger!
                  </div>
                </div>
              </div>

              {/* Chat Button - kleiner und rechts */}
              <div className="absolute left-[47%] bottom-20 w-[260px]">
                <a 
                  href="https://onlyfans.com/meliax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-transparent border-2 border-[#e3cbaa] text-[#e3cbaa] hover:text-black font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-base group inline-flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-[#e3cbaa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10">JETZT CHATTEN</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent blur-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Banner (nur über 460px) */}
          <div className="max-[460px]:hidden relative w-[400px] h-[650px] bg-gradient-to-b from-black via-black to-[#111] rounded-r-xl border-2 border-[#e3cbaa] shadow-2xl p-8">
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

              {/* OF Logo mit Glanz-Effekt */}
              <div className="relative w-48 h-16 transform hover:scale-105 transition-transform duration-300 -mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e3cbaa20] to-transparent animate-shine" />
                <Image
                  src="/OFbanner/OnlyFans_logo.png"
                  alt="OnlyFans Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Melia Foto - links positioniert */}
            <div className="absolute left-0 bottom-0 w-[250px] h-[80%]">
              <Image
                src="/OFbanner/melia.png"
                alt="Melia"
                fill
                className="object-contain object-left-bottom"
                priority
              />
            </div>
            
            {/* Rechter Content - aufgeteilt in zwei Bereiche */}
            <div className="absolute right-8 top-[45%] w-[180px]">
              {/* Name und Alter in einer Reihe */}
              <div className="text-center mb-4 flex items-baseline justify-center gap-1">
                <h4 className="text-[#e3cbaa] text-2xl font-bold font-playfair tracking-wider inline-flex items-baseline m-0"
                    style={{
                      textShadow: '0 0 10px rgba(227, 203, 170, 0.5)'
                    }}>
                  MELIAX
                </h4>
                <span className="text-[#e3cbaa] text-2xl font-bold leading-none">,</span>
                <span className="text-[#e3cbaa] text-2xl font-bold leading-none">23</span>
              </div>

              {/* Online Status */}
              <div className="flex items-center justify-center gap-2 mb-6">
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

              {/* Rabatt Text */}
              <div className="transform rotate-[-5deg] relative">
                <div className="absolute inset-0 bg-[#e3cbaa] blur-md opacity-20" />
                <div className="relative bg-gradient-to-r from-[#e3cbaa] via-[#d0b48f] to-[#e3cbaa] text-black py-2 px-4 rounded-lg text-lg font-bold shadow-xl whitespace-nowrap">
                  Jetzt 70% günstiger!
                </div>
              </div>
            </div>

            {/* Chat Button - kleiner und rechts */}
            <div className="absolute left-[47%] bottom-20 w-[260px]">
              <a 
                href="https://onlyfans.com/meliax"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-transparent border-2 border-[#e3cbaa] text-[#e3cbaa] hover:text-black font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-base group inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[#e3cbaa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10">JETZT CHATTEN</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent blur-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlyFansBanner; 