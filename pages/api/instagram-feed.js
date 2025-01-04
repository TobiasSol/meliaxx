export default async function handler(req, res) {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    // Wenn kein Token vorhanden ist, senden wir Beispieldaten
    const mockData = Array.from({ length: 6 }, (_, i) => ({
      id: `mock-${i}`,
      media_url: `https://picsum.photos/400/400?random=${i}`,
      caption: 'Beispiel Instagram Post',
      permalink: 'https://instagram.com',
    }));
    
    return res.status(200).json(mockData);
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Instagram API error');
    }

    res.status(200).json(data.data || []);
  } catch (error) {
    console.error('Instagram API Error:', error);
    // Bei Fehler auch Beispieldaten zurückgeben
    const mockData = Array.from({ length: 6 }, (_, i) => ({
      id: `mock-${i}`,
      media_url: `https://picsum.photos/400/400?random=${i}`,
      caption: 'Beispiel Instagram Post',
      permalink: 'https://instagram.com',
    }));
    
    res.status(200).json(mockData);
  }
} 