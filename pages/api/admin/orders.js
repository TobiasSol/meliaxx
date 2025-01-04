import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware für JWT Authentifizierung
const authenticateToken = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

async function ordersHandler(req, res) {
  // Hier können Sie die Bestellungen aus Ihrer Datenbank abrufen
  // Beispiel-Response
  const orders = [
    {
      id: 1,
      date: new Date(),
      amount: 200,
      status: 'completed',
      // ... weitere Bestelldetails
    },
  ];

  res.status(200).json(orders);
}

export default authenticateToken(ordersHandler); 