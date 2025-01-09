import { useState } from 'react';
import Link from 'next/link';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Deine Nachricht wurde erfolgreich gesendet!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-[#d0b48f] hover:text-[#e3cbaa] mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-[#e3cbaa] mb-8">Kontakt</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kontaktinformationen */}
          <div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#e3cbaa] mb-4">
                Kontaktinformationen
              </h2>
              <div className="space-y-4 text-white">
                <p>
                  <strong className="text-[#d0b48f]">E-Mail:</strong><br />
                  kontakt@meliax.de
                </p>
               
                <p>
                  <strong className="text-[#d0b48f]">Antwortzeit:</strong><br />
                  In der Regel innerhalb von 24 Stunden
                </p>
              </div>
            </div>
          </div>

          {/* Kontaktformular */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-[#e3cbaa] mb-4">
              Schreib uns eine Nachricht
            </h2>

            {status.message && (
              <div className={`p-4 rounded mb-4 ${
                status.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#d0b48f] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[#d0b48f] mb-2">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[#d0b48f] mb-2">Betreff</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[#d0b48f] mb-2">Nachricht</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-black border border-[#d0b48f] rounded p-2 text-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#d0b48f] text-black font-bold py-2 px-4 rounded hover:bg-[#e3cbaa] transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 