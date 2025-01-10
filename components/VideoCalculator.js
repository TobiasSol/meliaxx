import { useState } from "react";

export default function VideoCalculator() {
  const [duration, setDuration] = useState(10);
  const [is4K, setIs4K] = useState(false);
  const [extras, setExtras] = useState([]);
  const [language, setLanguage] = useState('Deutsch');
  const [setting, setSetting] = useState('Bedroom');
  const [videoType, setVideoType] = useState('Portrait');
  const [deliveryTime, setDeliveryTime] = useState('1 Week');
  const [appreciation, setAppreciation] = useState('');
  const [email, setEmail] = useState('');

  const calculatePrice = () => {
    let basePrice = duration === 10 ? 200 : 340;
    let additionalCosts = 0;
    
    if (is4K) additionalCosts += 20;
    
    const extraPrices = {
      'Say your name': 15,
      'Dirtytalk': 20,
      'Twerking': 25,
      'Feetplay': 25,
      'Blowjob Dildo': 100,
      'Fingering': 150,
      'Dildo Play Pussy': 200,
      'Titjob': 75,
      'Use Oil': 50,
      'Striptease': 100,
      'Orgasm': 100
    };
    
    extras.forEach(extra => {
      additionalCosts += extraPrices[extra] || 0;
    });

    const settingPrices = {
      'Shower': 10,
      'Jaccuzi': 10,
      'Car': 15
    };
    additionalCosts += settingPrices[setting] || 0;

    if (deliveryTime === '48 hours') additionalCosts += 20;

    const appreciationPrices = {
      'Show some Love': 20,
      'I Like you': 100,
      'I Cant wait for the Video': 150,
      'I LOVE YOU': 500
    };
    additionalCosts += appreciationPrices[appreciation] || 0;

    return basePrice + additionalCosts;
  };

  const validateOrder = () => {
    if (!email || !email.includes('@')) {
      alert('Bitte gib eine gültige E-Mail-Adresse ein.');
      return false;
    }

    if (extras.length === 0) {
      alert('Bitte wähle mindestens ein Extra aus.');
      return false;
    }
    
    if (!setting) {
      alert('Bitte wähle eine Location aus.');
      return false;
    }

    if (!videoType) {
      alert('Bitte wähle einen Video-Typ aus.');
      return false;
    }

    if (!deliveryTime) {
      alert('Bitte wähle eine Lieferzeit aus.');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setDuration(10);
    setIs4K(false);
    setExtras([]);
    setLanguage('Deutsch');
    setSetting('Bedroom');
    setVideoType('Portrait');
    setDeliveryTime('1 Week');
    setAppreciation('');
    setEmail('');
  };

  const handleSubmit = async () => {
    if (!validateOrder()) {
      return;
    }
  
    try {
      const response = await fetch('/api/video-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          duration,
          is4K,
          extras,
          language,
          setting,
          videoType,
          deliveryTime,
          appreciation,
          totalPrice: calculatePrice()
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Vielen Dank für deine Anfrage! Wir werden uns zeitnah bei dir melden.');
        resetForm();
      } else {
        throw new Error(data.message || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };
  return (
    <div className="min-h-screen bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-[#e3cbaa] mb-4">
            Custom Video Preisrechner
          </h2>
        <h2 className="text-2xl  text-[#d0b48f] mb-12 text-center">MAKE YOUR DREAM A REALITY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Linke Spalte */}
          <div className="space-y-3">
            {/* Package Selection */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">1</span>
                </div>
                Select Package
              </label>
              <div className="flex flex-col space-y-1">
                {[
                  { duration: 10, price: 200 },
                  { duration: 20, price: 340 }
                ].map((option) => (
                  <div
                    key={option.duration}
                    onClick={() => setDuration(option.duration)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      duration === option.duration 
                      ? 'bg-gray-900 border-[#d0b48f]' 
                      : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-base font-bold ${duration === option.duration ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        {option.duration} Min
                      </span>
                      <span className={`text-base font-black ${duration === option.duration ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        (+€{option.price})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">2</span>
                </div>
                Language
              </label>
              <div className="flex flex-col space-y-1">
                {['Deutsch', 'English'].map((lang) => (
                  <div
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      language === lang 
                      ? 'bg-gray-900 border-[#d0b48f]' 
                      : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <span className={`text-base font-bold ${language === lang ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Setting */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">4</span>
                </div>
                Setting
              </label>
              <div className="flex flex-col space-y-1">
                {[
                  { name: 'Bedroom', price: 0 },
                  { name: 'Couch', price: 0 },
                  { name: 'Shower', price: 10 },
                  { name: 'Jaccuzi', price: 10 },
                  { name: 'Car', price: 15 }
                ].map((set) => (
                  <div
                    key={set.name}
                    onClick={() => setSetting(set.name)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      setting === set.name 
                      ? 'bg-gray-900 border-[#d0b48f]' 
                      : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-base font-bold ${setting === set.name ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        {set.name}
                      </span>
                      {set.price > 0 && (
                        <span className={`text-base font-black ${setting === set.name ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                          (+€{set.price})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mittlere Spalte */}
          <div className="space-y-3">
            {/* Extras */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">3</span>
                </div>
                Extras
              </label>
              <div className="flex flex-col space-y-1">
                {[
                  { name: 'Say your name', price: 15 },
                  { name: 'Dirtytalk', price: 20 },
                  { name: 'Twerking', price: 25 },
                  { name: 'Feetplay', price: 25 },
                  { name: 'Blowjob Dildo', price: 100 },
                  { name: 'Fingering', price: 150 },
                  { name: 'Dildo Play Pussy', price: 200 },
                  { name: 'Titjob', price: 75 },
                  { name: 'Use Oil', price: 50 },
                  { name: 'Striptease', price: 100 },
                  { name: 'Orgasm', price: 100 }
                ].map((extra) => (
                  <div
                    key={extra.name}
                    onClick={() => {
                      if (extras.includes(extra.name)) {
                        setExtras(extras.filter(e => e !== extra.name));
                      } else {
                        setExtras([...extras, extra.name]);
                      }
                    }}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      extras.includes(extra.name)
                      ? 'bg-gray-900 border-[#d0b48f]' 
                      : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-base font-bold ${extras.includes(extra.name) ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        {extra.name}
                      </span>
                      <span className={`text-base font-black ${extras.includes(extra.name) ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        (+€{extra.price})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rechte Spalte */}
          <div className="space-y-3">
            {/* Video Type & Resolution */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">5</span>
                </div>
                Video Settings
              </label>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-base font-bold text-gray-900">Video Type</span>
                  {['Portrait', 'Landscape'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setVideoType(type)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        videoType === type 
                        ? 'bg-gray-900 border-[#d0b48f]' 
                        : 'border-gray-800 hover:border-gray-900'
                      }`}
                    >
                      <span className={`text-base font-bold ${videoType === type ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        {type}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-base font-bold text-gray-900">Resolution</span>
                  <div
                    onClick={() => setIs4K(false)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      !is4K ? 'bg-gray-900 border-[#d0b48f]' : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <span className={`text-base font-bold ${!is4K ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                      Full HD 1080p
                    </span>
                  </div>
                  <div
                    onClick={() => setIs4K(true)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      is4K ? 'bg-gray-900 border-[#d0b48f]' : 'border-gray-800 hover:border-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-base font-bold ${is4K ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        4K
                      </span>
                      <span className={`text-base font-black ${is4K ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                        (+€20)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Time & Appreciation */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
                  <span className="text-base">6</span>
                </div>
                Delivery & Appreciation
              </label>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-base font-bold text-gray-900">Delivery Time</span>
                  {[
                    { time: '48 hours', price: 20 },
                    { time: '1 Week', price: 0 },
                    { time: '3-4 Weeks', price: 0 }
                  ].map((delivery) => (
                    <div
                      key={delivery.time}
                      onClick={() => setDeliveryTime(delivery.time)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        deliveryTime === delivery.time 
                        ? 'bg-gray-900 border-[#d0b48f]' 
                        : 'border-gray-800 hover:border-gray-900'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-base font-bold ${deliveryTime === delivery.time ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                          {delivery.time}
                        </span>
                        {delivery.price > 0 && (
                          <span className={`text-base font-black ${deliveryTime === delivery.time ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                            (+€{delivery.price})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-base font-bold text-gray-900">Special Appreciation</span>
                  {[
                    { name: 'Show some Love', price: 20 },
                    { name: 'I Like you', price: 100 },
                    { name: 'I Cant wait for the Video', price: 150 },
                    { name: 'I LOVE YOU', price: 500 }
                  ].map((app) => (
                    <div
                      key={app.name}
                      onClick={() => setAppreciation(app.name)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        appreciation === app.name 
                        ? 'bg-gray-900 border-[#d0b48f]' 
                        : 'border-gray-800 hover:border-gray-900'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-base font-bold ${appreciation === app.name ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                          {app.name}
                        </span>
                        <span className={`text-base font-black ${appreciation === app.name ? 'text-[#d0b48f]' : 'text-gray-900'}`}>
                          (+€{app.price})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

{/* Email Field */}
<div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
  <label className="block text-xl font-black text-gray-900 mb-4 flex items-center">
    <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-[#d0b48f] rounded-full mr-2 flex-shrink-0">
      <span className="text-base">6</span>
    </div>
    Deine E-Mail
  </label>
  <div className="space-y-4">
    <div className="flex flex-col space-y-1">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Deine E-Mail für Rückfragen"
        className="p-4 rounded-lg border-2 border-gray-800 bg-white text-gray-900"
        required
      />
    </div>
  </div>
</div>




            {/* Checkout Button */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-3 shadow-lg">
              <div className="text-3xl font-black text-gray-900 text-center mb-6">
                Gesamtpreis: {calculatePrice()}€
              </div>
              <button
  onClick={handleSubmit}
  className="w-full bg-gray-900 text-[#d0b48f] text-lg font-black py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={extras.length === 0}
>
  Jetzt anfragen
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 