import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    passwordprotectionenabled: false,
    preloaderenabled: true,
    sitepassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Fehler beim Laden der Einstellungen');
      
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) throw new Error('Fehler beim Speichern der Einstellungen');
      
      alert('Einstellungen erfolgreich gespeichert');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Laden...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Einstellungen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={settings.passwordprotectionenabled}
              onChange={(e) => setSettings({
                ...settings,
                passwordprotectionenabled: e.target.checked
              })}
              className="mr-2"
            />
            Passwortschutz aktivieren
          </label>
        </div>

        <div>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={settings.preloaderenabled}
              onChange={(e) => setSettings({
                ...settings,
                preloaderenabled: e.target.checked
              })}
              className="mr-2"
            />
            Preloader aktivieren
          </label>
        </div>

        {settings.passwordprotectionenabled && (
          <div>
            <label className="block mb-2">
              Seiten-Passwort:
              <input
                type="password"
                value={settings.sitepassword}
                onChange={(e) => setSettings({
                  ...settings,
                  sitepassword: e.target.value
                })}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Einstellungen speichern
        </button>
      </form>
    </div>
  );
}

// Diese Seite nur serverseitig rendern
export const getServerSideProps = async () => {
  return {
    props: {}
  };
};