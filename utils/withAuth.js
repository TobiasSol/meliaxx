import { verify } from 'jsonwebtoken';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      // Debug-Logs
      console.log('Checking authorization header:', req.headers.authorization);
      
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Token fehlt' });
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Auth Error:', error);
      return res.status(401).json({ message: 'Ungültiger Token' });
    }
  };
}