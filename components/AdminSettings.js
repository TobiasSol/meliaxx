import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client mit Service Role Key initialisieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    global: {
      fetch: fetch.bind(globalThis)
    }
  }
);

export default function AdminSettings() {
 const [settings, setSettings] = useState({
   passwordprotectionenabled: false,
   preloaderenabled: true,
   sitepassword: ''
 });
 const [newPassword, setNewPassword] = useState('');
 const [status, setStatus] = useState({ type: '', message: '' });
 const [isLoading, setIsLoading] = useState(true);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
   setIsClient(true);
 }, []);

 useEffect(() => {
   fetchSettings();
 }, []);



 const fetchSettings = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    console.log('Using token:', token); // Debug-Log
    
    if (!token) {
      throw new Error('Nicht eingeloggt');
    }

    const response = await fetch('/api/admin/settings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Response status:', response.status); // Debug-Log
    const data = await response.json();

    if (response.ok) {
      setSettings(data);
    } else {
      throw new Error(data.message || 'Failed to fetch settings');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setStatus({
      type: 'error',
      message: error.message || 'Fehler beim Laden der Einstellungen'
    });
  }
};



const handleSettingToggle = async (settingName) => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      throw new Error('Nicht eingeloggt');
    }

    const updatedSettings = {
      ...settings,
      [settingName]: !settings[settingName]
    };

    // Log für Debugging
    console.log('Sending settings update:', updatedSettings);

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedSettings),
    });

    // Log für Debugging
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      setSettings(data);
      setStatus({
        type: 'success',
        message: 'Einstellung wurde aktualisiert'
      });
    } else {
      throw new Error(data.message || 'Failed to update settings');
    }
  } catch (error) {
    console.error('Toggle error:', error);
    setStatus({
      type: 'error',
      message: error.message || 'Fehler beim Speichern der Einstellungen'
    });
  } finally {
    setIsLoading(false);
  }
};



const handlePasswordChange = async (e) => {
  e.preventDefault();
  if (!supabase) return;
  try {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      throw new Error('Nicht eingeloggt');
    }

    const updatedSettings = {
      ...settings,
      sitepassword: newPassword
    };

    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({...updatedSettings, sitepassword: newPassword}),
    });

    const data = await response.json();

    if (response.ok) {
      setSettings(data);
      setNewPassword('');
      setStatus({
        type: 'success',
        message: 'Passwort wurde aktualisiert'
      });
    } else {
      throw new Error(data.message || 'Failed to update password');
    }
  } catch (error) {
    console.error('Password update error:', error);
    setStatus({
      type: 'error',
      message: error.message || 'Fehler beim Aktualisieren des Passworts'
    });
  } finally {
    setIsLoading(false);
  }
};




 if (isLoading) {
   return (
     <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
       <p className="text-[#e3cbaa]">Loading...</p>
     </div>
   );
 }

 if (!isClient) {
   return <div className="bg-gray-900 p-6 rounded-lg">Loading...</div>;
 }

 return (
   <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
     <h2 className="text-2xl font-bold text-[#e3cbaa]">Website Einstellungen</h2>

     {status.message && (
       <div className={`p-4 rounded-lg ${
         status.type === 'success' 
           ? 'bg-green-500/10 border border-green-500 text-green-500' 
           : 'bg-red-500/10 border border-red-500 text-red-500'
       }`}>
         {status.message}
       </div>
     )}

     <div className="space-y-4">
       <div className="flex items-center justify-between">
         <div>
           <h3 className="text-white font-medium">Passwortschutz</h3>
           <p className="text-gray-400 text-sm">Aktiviere den Passwortschutz für die Website</p>
         </div>
         <button
           onClick={() => handleSettingToggle('passwordprotectionenabled')}
           disabled={isLoading}
           className="relative inline-flex items-center cursor-pointer disabled:opacity-50"
         >
           <div className={`w-11 h-6 rounded-full transition-colors ${
             settings.passwordprotectionenabled ? 'bg-[#d0b48f]' : 'bg-gray-700'
           }`}>
             <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
               settings.passwordprotectionenabled ? 'translate-x-5' : 'translate-x-0'
             }`} />
           </div>
         </button>
       </div>

       <div className="flex items-center justify-between">
         <div>
           <h3 className="text-white font-medium">Preloader</h3>
           <p className="text-gray-400 text-sm">Aktiviere die Intro-Animation</p>
         </div>
         <button
           onClick={() => handleSettingToggle('preloaderenabled')}
           disabled={isLoading}
           className="relative inline-flex items-center cursor-pointer disabled:opacity-50"
         >
           <div className={`w-11 h-6 rounded-full transition-colors ${
             settings.preloaderenabled ? 'bg-[#d0b48f]' : 'bg-gray-700'
           }`}>
             <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
               settings.preloaderenabled ? 'translate-x-5' : 'translate-x-0'
             }`} />
           </div>
         </button>
       </div>

       <div className="pt-4 border-t border-gray-800">
         <form onSubmit={handlePasswordChange} className="space-y-4">
           <div>
             <label className="block text-[#d0b48f] mb-2">Neues Passwort setzen</label>
             <input
               type="password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
               placeholder="Neues Passwort eingeben"
               minLength={6}
               disabled={isLoading}
             />
           </div>
           <button
             type="submit"
             disabled={!newPassword || isLoading}
             className="bg-[#d0b48f] text-black px-4 py-2 rounded hover:bg-[#e3cbaa] 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isLoading ? 'Wird aktualisiert...' : 'Passwort aktualisieren'}
           </button>
         </form>
       </div>
     </div>
   </div>
 );
}