{
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        },
        {
          "key": "Content-Type",
          "value": "application/javascript"
        },
        {
          "key": "Cache-Control",
          "value": "no-cache, max-age=0"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://*.braze.com; worker-src 'self' blob:;"
        }
      ]
    }
  ],
  "routes": [
    {
      "src": "/api/webhook",
      "methods": ["POST", "GET", "OPTIONS"],
      "dest": "/api/webhook.js"
    },
    {
      "src": "/api/get-message",
      "methods": ["GET"],
      "dest": "/api/get-message.js"
    },
    {
      "src": "/api/sse",
      "methods": ["GET"],
      "dest": "/api/sse.js"
    },
    {
      "src": "/push-test",
      "methods": ["GET"],
      "headers": {
        "x-vercel-protection-bypass": "1"
      },
      "dest": "/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
