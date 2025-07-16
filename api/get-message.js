// api/get-message.js
// This endpoint is called by the frontend to check for new messages

import { getMessageStore } from './message-store';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    const store = getMessageStore();
    const message = store.getMessage();
    
    return res.status(200).json({ 
      message: message 
    });
  }
  
  return res.status(405).json({ error: "Method not allowed" });
}
