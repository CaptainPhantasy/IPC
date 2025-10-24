#!/bin/bash

# Quick start script for ACE Frontend with HTTPS
# Use this to start the server after initial setup

cd "$(dirname "$0")"

# Kill existing process
lsof -ti:9473 | xargs kill -9 2>/dev/null || true
sleep 1

# Clear cache
rm -rf .next

echo "🚀 Starting ACE Frontend with HTTPS on port 9473..."
echo "📱 Access at: https://localhost:9473/ui"

# Start with HTTPS
HTTPS=true \
SSL_CRT_FILE=.ssl/localhost-cert.pem \
SSL_KEY_FILE=.ssl/localhost-key.pem \
PORT=9473 \
npm run dev
