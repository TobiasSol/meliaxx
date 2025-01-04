// pages/password.js
// pages/password.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PasswordProtection() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { returnTo } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        document.cookie = 'site_access=granted; path=/; max-age=86400'; // 24 hours
        router.push(returnTo || '/');
      } else {
        setError('Falsches Passwort');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
      console.error(err);
    }
  };
  
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#e3cbaa] mb-6">
            Geschützter Bereich
          </h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#d0b48f] mb-2">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-[#d0b48f] text-black font-bold py-2 px-4 rounded hover:bg-[#e3cbaa] transition-colors"
            >
              Zugang bestätigen
            </button>
          </form>
        </div>
      </div>
    );
}