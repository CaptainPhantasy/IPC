#!/bin/bash

# ACE Frontend HTTPS Setup Script
# This enables microphone access by setting up HTTPS for local development

set -e

echo "🔐 Setting up HTTPS for ACE Frontend..."

# Navigate to frontend directory
cd "$(dirname "$0")"

# Create SSL directory
mkdir -p .ssl

# Check if certificates already exist
if [ -f ".ssl/localhost-cert.pem" ] && [ -f ".ssl/localhost-key.pem" ]; then
    echo "✅ SSL certificates already exist"
else
    echo "📜 Generating self-signed SSL certificate..."
    openssl req -x509 -newkey rsa:4096 \
        -keyout .ssl/localhost-key.pem \
        -out .ssl/localhost-cert.pem \
        -days 365 -nodes \
        -subj "/CN=localhost/O=ACE Development/C=US"

    echo "✅ SSL certificate generated successfully"
fi

# Update .gitignore to exclude SSL files
if ! grep -q ".ssl/" .gitignore 2>/dev/null; then
    echo ".ssl/" >> .gitignore
    echo "✅ Added .ssl/ to .gitignore"
fi

# Kill existing process on port 9473
echo "🛑 Stopping existing server..."
lsof -ti:9473 | xargs kill -9 2>/dev/null || echo "No existing server found"

# Wait a moment for port to be released
sleep 1

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo ""
echo "✅ HTTPS setup complete!"
echo ""
echo "🚀 Starting ACE Frontend with HTTPS..."
echo ""
echo "Access the app at: https://localhost:9473/ui"
echo "Note: You'll see a security warning - click 'Advanced' → 'Proceed to localhost'"
echo ""

# Start the server with HTTPS
HTTPS=true \
SSL_CRT_FILE=.ssl/localhost-cert.pem \
SSL_KEY_FILE=.ssl/localhost-key.pem \
PORT=9473 \
npm run dev
