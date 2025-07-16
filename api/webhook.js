// api/webhook.js
export default async function handler(req, res) {
  // 1. Allow all POST requests (disable auth)
  if (req.method === 'POST') {
    console.log("Received webhook (no auth):", req.body);
    return res.status(200).json({ status: "OK" });
  }
  
  // 2. Block non-POST requests
  return res.status(405).json({ error: "Method not allowed" });
}
