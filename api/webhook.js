// api/webhook.js
const { getMessageStore } = require('./message-store');
const WebSocket = require('ws');

// Create WebSocket server (if not already created elsewhere)
let wss;
if (!global.wss) {
  wss = new WebSocket.Server({ noServer: true });
  global.wss = wss;
} else {
  wss = global.wss;
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      console.log("Received webhook from Braze:", req.body);
      
      const message = req.body.message || 
                     req.body.custom_message || 
                     req.body.data?.message ||
                     "New notification from Braze!";
      
      // Store message
      const store = getMessageStore();
      store.setMessage(message);
      
      // Broadcast to all connected clients
      if (wss) {
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'notification',
              data: message
            }));
          }
        });
      }

      return res.status(200).json({ 
        status: "success",
        message: "Message received and broadcasted",
        timestamp: Date.now()
      });
      
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(500).json({ 
        status: "error",
        error: error.message 
      });
    }
  }
  
  if (req.method === 'GET') {
    const store = getMessageStore();
    const message = store.getMessage();
    return res.status(200).json({ message });
  }
  
  return res.status(405).json({ error: "Method not allowed" });
};

// Export WebSocket server for HTTP server upgrade
module.exports.upgrade = (server) => {
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
};
