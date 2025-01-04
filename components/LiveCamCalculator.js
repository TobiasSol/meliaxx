import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function LiveCamCalculator() {
  const [duration, setDuration] = useState(10);
  const [quality, setQuality] = useState('HD');
  const [extras, setExtras] = useState([]);
  const [language, setLanguage] = useState('Deutsch');
  const [showType, setShowType] = useState('Standard');
  const [appreciation, setAppreciation] = useState('');

  const calculatePrice = () => {
    let basePrice;
    if (duration === 30) basePrice = 350;
    else if (duration === 45) basePrice = 600;
    else basePrice = duration === 10 ? 100 : 180;
    let additionalCosts = 0;
    
    // Qualität
    if (quality === '4K') additionalCosts += 30;
    
    // Extras
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

    // Show Type
    const showTypePrices = {
      'Premium': 50,
      'VIP': 100
    };
    additionalCosts += showTypePrices[showType] || 0;

    // Appreciation
    const appreciationPrices = {
      'Trinkgeld': 20,
      'Kleines Geschenk': 50,
      'Großes Geschenk': 100,
      'VIP Status': 200
    };
    additionalCosts += appreciationPrices[appreciation] || 0;

    return basePrice + additionalCosts;
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    
    const response = await fetch('/api/livecam-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        duration,
        quality,
        extras,
        language,
        showType,
        appreciation,
        totalPrice: calculatePrice()
      }),
    });

    const session = await response.json();
    
    if (session.error) {
      alert('Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es später erneut.');
      return;
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert('Fehler beim Weiterleiten zur Bezahlseite. Bitte versuchen Sie es später erneut.');
    }
  };

  const validateOrder = () => {
    if (extras.length === 0) {
      alert('Bitte wählen Sie mindestens ein Extra aus.');
      return false;
    }
    
    if (!showType) {
      alert('Bitte wählen Sie einen Show-Typ aus.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateOrder()) {
      return;
    }

    try {
      await handleCheckout();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <div className="min-h-screen bg-black py-10 flex items-center justify-center">
      <div className="max-w-7xl w-full px-4">
        <h1 className="text-5xl font-black text-[#d0b48f] mb-2 text-center">LIVE CAM SESSION</h1>
        <h2 className="text-2xl font-extrabold text-[#d0b48f] mb-12 text-center">DEINE PRIVATE SHOW</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Linke Spalte */}
          <div className="space-y-6">
            {/* Package Selection */}
            <div className="bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-6 shadow-lg">
              <label className="block text-xl font-black text-gray-900 mb-4">Dauer</label>
              <div className="flex flex-col space-y-3">
                {[
                  { duration: 10, price: 100 },
                  { duration: 20, price: 180 },
                  { duration: 30, price: 350 },
                  { duration: 45, price: 600 }
                ].map((option) => (
                  <div
                    key={option.duration}
                    onClick={() => setDuration(option.duration)}
                    className={`cursor-pointer p-4 rounded-lg border-2 ${
                      duration === option.duration 
                      ? 'bg-gray-900 border-[#d0b48f] text-[#d0b48f]' 
                      : 'border-gray-800 text-gray-900'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.duration} Min</span>
                      <span>€{option.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weitere UI-Komponenten hier... */}
          </div>
          
          {/* Mittlere und rechte Spalte analog zum VideoCalculator */}
        </div>

        {/* Checkout Button */}
        <div className="mt-6 bg-gradient-to-b from-[#d0b48f] to-[#e5d4bc] rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-black text-gray-900 text-center mb-6">
            Gesamtpreis: {calculatePrice()}€
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-900 text-[#d0b48f] text-lg font-black py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            disabled={extras.length === 0}
          >
            Jetzt buchen
          </button>
        </div>
      </div>
    </div>
  );
} 