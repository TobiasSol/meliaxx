import { useState, useEffect } from 'react';

export default function PasswordSettings() {
  const [settings, setSettings] = useState({
    passwordProtectionEnabled: false,
    preloaderEnabled: true,
    sitePassword: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSettingToggle = async (setting) => {
    try {
      const updatedSettings = {
        ...settings,
        [setting]: !settings[setting]
      };

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      });

      if (res.ok) {
        setSettings(updatedSettings);
        setStatus({
          type: 'success',
          message: `${setting === 'passwordProtectionEnabled' ? 'Passwortschutz' : 'Preloader'} ${!settings[setting] ? 'aktiviert' : 'deaktiviert'}`
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Fehler beim Aktualisieren der Einstellungen'
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...settings,
          sitePassword: newPassword,
        }),
      });

      if (res.ok) {
        setSettings(prev => ({ ...prev, sitePassword: newPassword }));
        setNewPassword('');
        setStatus({
          type: 'success',
          message: 'Passwort erfolgreich aktualisiert'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Fehler beim Aktualisieren des Passworts'
      });
    }
  };

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
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.passwordProtectionEnabled}
              onChange={() => handleSettingToggle('passwordProtectionEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d0b48f]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Preloader</h3>
            <p className="text-gray-400 text-sm">Aktiviere die Intro-Animation</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.preloaderEnabled}
              onChange={() => handleSettingToggle('preloaderEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d0b48f]"></div>
          </label>
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
              />
            </div>
            <button
              type="submit"
              disabled={!newPassword}
              className="bg-[#d0b48f] text-black px-4 py-2 rounded hover:bg-[#e3cbaa] transition-colors disabled:opacity-50"
            >
              Passwort aktualisieren
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}