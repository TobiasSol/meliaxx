// utils/withAuth.js
import { verify } from 'jsonwebtoken';

export function withAuth(handler) {
  return async (req, res) => {
    // GET requests erlauben
    if (req.method === 'GET') {
      return handler(req, res);
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Nicht autorisiert' });
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      return handler(req, res);
    } catch (error) {
      console.error('Auth Error:', error);
      return res.status(401).json({ message: 'Ungültiger Token' });
    }
  };
}