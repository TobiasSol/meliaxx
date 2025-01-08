import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LiveCam() {
  const [duration, setDuration] = useState(10);
  const [quality, setQuality] = useState('HD');
  const [extras, setExtras] = useState([]);
  const [error, setError] = useState(null);

  const calculatePrice = () => {
    let basePrice = duration === 10 ? 100 : duration === 20 ? 180 : duration === 30 ? 350 : 600;
    let additionalCosts = 0;
    
    if (quality === '4K') additionalCosts += 30;
    
    const extraPrices = {
      'Namensnennung': 20,
      'Dirtytalk': 25,
      'Twerking': 30,
      'Feetplay': 35,
      'Rollenspiel': 50,
      'Striptease': 60,
    };
    
    extras.forEach(extra => {
      additionalCosts += extraPrices[extra] || 0;
    });

    return basePrice + additionalCosts;
  };

  const handleSubmit = () => {
    setError(null);

    if (extras.length === 0) {
      setError('Bitte wähle mindestens ein Extra aus');
      return;
    }

    // Hier könnte später die Weiterleitung zum Buchungssystem erfolgen
    console.log('Buchungsanfrage:', {
      duration,
      quality,
      extras,
      totalPrice: calculatePrice()
    });
  };

  return (
    <div className="min-h-screen bg-black text-white mt-12">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 relative">
          <div className="aspect-video max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 noise-effect"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#e3cbaa] mb-4">
                  Offline
                </h2>
                <p className="text-xl text-[#d0b48f]">
                  Buche jetzt deine private Show
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 pt-8 mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-[#e3cbaa] mb-8 text-center">
            Live Cam Preisrechner
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <div className="bg-gray-900 rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#d0b48f] mb-4">Dauer wählen</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[10, 20, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`p-4 rounded-lg border-2 ${
                      duration === mins 
                        ? 'border-[#e3cbaa] bg-[#e3cbaa]/10 text-[#e3cbaa]'
                        : 'border-gray-700 text-gray-400 hover:border-[#d0b48f] hover:text-[#d0b48f]'
                    }`}
                  >
                    {mins} Minuten
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#d0b48f] mb-4">Qualität</h3>
              <div className="grid grid-cols-2 gap-4">
                {['HD', '4K'].map((qual) => (
                  <button
                    key={qual}
                    onClick={() => setQuality(qual)}
                    className={`p-4 rounded-lg border-2 ${
                      quality === qual 
                        ? 'border-[#e3cbaa] bg-[#e3cbaa]/10 text-[#e3cbaa]'
                        : 'border-gray-700 text-gray-400 hover:border-[#d0b48f] hover:text-[#d0b48f]'
                    }`}
                  >
                    {qual}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#d0b48f] mb-4">Extras</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Namensnennung',
                  'Dirtytalk',
                  'Twerking',
                  'Feetplay',
                  'Rollenspiel',
                  'Striptease'
                ].map((extra) => (
                  <button
                    key={extra}
                    onClick={() => {
                      setExtras(prev => 
                        prev.includes(extra)
                          ? prev.filter(e => e !== extra)
                          : [...prev, extra]
                      )
                    }}
                    className={`p-4 rounded-lg border-2 ${
                      extras.includes(extra)
                        ? 'border-[#e3cbaa] bg-[#e3cbaa]/10 text-[#e3cbaa]'
                        : 'border-gray-700 text-gray-400 hover:border-[#d0b48f] hover:text-[#d0b48f]'
                    }`}
                  >
                    {extra}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="text-3xl font-bold text-center mb-6">
                <span className="text-[#d0b48f]">Gesamtpreis: </span>
                <span className="text-[#e3cbaa]">{calculatePrice()}€</span>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#e3cbaa] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#d0b48f] transition-colors"
              >
                Jetzt buchen
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}