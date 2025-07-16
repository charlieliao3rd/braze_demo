// api/webhook.js
// This webhook accepts POST requests from Braze without authentication
// and stores the message to be displayed as a popup

const { getMessageStore } = require('./message-store');

module.exports = async function handler(req, res) {
  // Enable CORS for all origins (adjust for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST requests from Braze
  if (req.method === 'POST') {
    try {
      console.log("Received webhook from Braze:", req.body);
      
      // Extract message from Braze payload
      // Adjust based on your Braze webhook configuration
      const message = req.body.message || 
                     req.body.custom_message || 
                     req.body.data?.message ||
                     "New notification from Braze!";
      
      // Store message using shared store
      const store = getMessageStore();
      store.setMessage(message);
      
      return res.status(200).json({ 
        status: "success",
        message: "Message received and will be displayed",
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
  
  // Handle GET requests to retrieve current message
  if (req.method === 'GET') {
    const store = getMessageStore();
    const message = store.getMessage();
    
    return res.status(200).json({ 
      message: message 
    });
  }
  
  // Block other methods
  return res.status(405).json({ error: "Method not allowed" });
};
