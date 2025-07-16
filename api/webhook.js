export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;

    console.log('🔔 Webhook received:', payload);

    // You can customize this logic — e.g., display this in your UI via database or logs
    return res.status(200).json({ status: 'Received', received: payload });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return res.status(500).json({ error: 'Server Error' });
  }
}
