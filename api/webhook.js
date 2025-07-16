import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_super_secret_key'; // Manually set here

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Authenticated request from:', decoded);

    const payload = req.body;
    console.log('🔔 Webhook received:', payload);

    return res.status(200).json({ status: 'Received', received: payload, user: decoded });

  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
  }
}

