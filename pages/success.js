  import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      // Hier könnte später eine API-Abfrage implementiert werden, 
      // um die Bestelldetails zu laden
      setSessionData({
        orderNumber: Math.floor(Math.random() * 1000000),
        timestamp: new Date().toLocaleString()
      });
      setLoading(false);
    }
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#e3cbaa]">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-8">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-[#e3cbaa] mb-4">
              Bestellung erfolgreich!
            </h1>
            <p className="text-white mb-6">
              Vielen Dank für deine Bestellung. Wir haben deine Zahlung erhalten und werden dein Video schnellstmöglich produzieren.
            </p>
            
            <div className="bg-black p-6 rounded-lg w-full mb-6">
              <div className="mb-4">
                <span className="text-[#d0b48f]">Bestellnummer:</span>
                <span className="text-white ml-2">{sessionData.orderNumber}</span>
              </div>
              <div>
                <span className="text-[#d0b48f]">Bestelldatum:</span>
                <span className="text-white ml-2">{sessionData.timestamp}</span>
              </div>
            </div>

            <p className="text-white mb-8">
              Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details zu deiner Bestellung.
            </p>

            <Link
              href="/"
              className="bg-[#d0b48f] text-black px-8 py-3 rounded-lg hover:bg-[#e3cbaa] transition-colors font-bold"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}