// api/message-store.js
// Shared message storage for webhook and get-message endpoints

let messageStore = {
  message: null,
  timestamp: null,
  timeoutId: null
};

export function getMessageStore() {
  return {
    setMessage(message) {
      // Clear any existing timeout
      if (messageStore.timeoutId) {
        clearTimeout(messageStore.timeoutId);
      }
      
      messageStore.message = message;
      messageStore.timestamp = Date.now();
      
      // Auto-clear after 30 seconds
      messageStore.timeoutId = setTimeout(() => {
        this.clearMessage();
      }, 30000);
    },
    
    getMessage() {
      // Check if message is still valid
      if (messageStore.message && 
          messageStore.timestamp && 
          (Date.now() - messageStore.timestamp < 30000)) {
        const msg = messageStore.message;
        // Clear after retrieval for one-time display
        this.clearMessage();
        return msg;
      }
      return null;
    },
    
    clearMessage() {
      messageStore.message = null;
      messageStore.timestamp = null;
      if (messageStore.timeoutId) {
        clearTimeout(messageStore.timeoutId);
        messageStore.timeoutId = null;
      }
    }
  };
}
