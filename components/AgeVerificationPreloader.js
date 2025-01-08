import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AgeVerificationPreloader({ onVerified }) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already verified their age
    const hasVerified = localStorage.getItem('age_verified');
    if (hasVerified) {
      setVerified(true);
    }
    setLoading(false);
  }, []);

  const handleVerification = (isOver18) => {
    if (isOver18) {
      localStorage.setItem('age_verified', 'true');
      setVerified(true);
      if (onVerified) onVerified();
    } else {
      // Redirect to Google if under 18
      window.location.href = 'https://www.google.com';
    }
  };

  if (loading || verified) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full mx-4 border-2 border-[#e3cbaa]">
        <h2 className="text-4xl text-[#e3cbaa] text-center mb-6">
          Altersprüfung erforderlich
        </h2>
        
        <div className="text-white text-2xl text-center mb-8">
          <p className="mb-4">
            Diese Website enthält explizite Inhalte für Erwachsene.
          </p>
          <p className="text-lg ">
            Bist du 18 Jahre oder älter?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleVerification(true)}
            className="w-full bg-[#e3cbaa] text-black px-6 py-3 rounded-lg hover:bg-[#d0b48f] transition-colors "
          >
            JA, ich bin über 18
          </button>
          
          <button
            onClick={() => handleVerification(false)}
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            NEIN, ich bin unter 18
          </button>
        </div>

        <p className="mt-6 text-md text-gray-400 text-center">
          Durch Klicken auf "JA" bestätigst du, dass du 18 Jahre oder älter bist und 
          unsere Nutzungsbedingungen akzeptierst.
        </p>
      </div>
    </div>
  );
}