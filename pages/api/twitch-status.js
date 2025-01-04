export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Hier können Sie später die tatsächliche Twitch-API-Integration implementieren
    // Für den Moment geben wir einen Mock-Status zurück
    res.status(200).json({ isLive: false });
  } catch (error) {
    console.error('Fehler beim Abrufen des Twitch-Status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 