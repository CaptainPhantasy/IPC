#!/bin/bash

# ACE Frontend HTTPS Setup using local-ssl-proxy
# This creates an HTTPS proxy in front of the HTTP dev server

set -e

echo "🔐 Setting up HTTPS proxy for ACE Frontend..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    exit 1
fi

# Install local-ssl-proxy globally if not already installed
if ! command -v local-ssl-proxy &> /dev/null; then
    echo "📦 Installing local-ssl-proxy..."
    npm install -g local-ssl-proxy
else
    echo "✅ local-ssl-proxy already installed"
fi

# Navigate to frontend directory
cd "$(dirname "$0")"

# Kill any existing processes on ports 9473 and 9474
echo "🛑 Stopping existing servers..."
lsof -ti:9473 | xargs kill -9 2>/dev/null || true
lsof -ti:9474 | xargs kill -9 2>/dev/null || true

# Wait for ports to be released
sleep 2

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Start the HTTP dev server on port 9474 in the background
echo "🚀 Starting HTTP dev server on port 9474..."
PORT=9474 npm run dev > /tmp/ace-frontend-http.log 2>&1 &
HTTP_PID=$!

# Wait for the HTTP server to be ready
echo "⏳ Waiting for HTTP server to start..."
for i in {1..30}; do
    if lsof -ti:9474 > /dev/null 2>&1; then
        echo "✅ HTTP server ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ HTTP server failed to start. Check /tmp/ace-frontend-http.log"
        exit 1
    fi
    sleep 1
done

# Start the HTTPS proxy
echo "🔒 Starting HTTPS proxy on port 9473..."
echo ""
echo "=========================================="
echo "  ACE Frontend is now running with HTTPS"
echo "=========================================="
echo ""
echo "📱 Access at: https://localhost:9473/ui"
echo "🔧 HTTP server: http://localhost:9474/ui"
echo ""
echo "⚠️  You'll see a security warning - this is normal for self-signed certificates."
echo "    Click 'Advanced' → 'Proceed to localhost (unsafe)' to continue."
echo ""
echo "📝 Logs:"
echo "   - HTTP server: /tmp/ace-frontend-http.log"
echo "   - HTTPS proxy: (shown below)"
echo ""
echo "🛑 Press Ctrl+C to stop both servers"
echo ""

# Run the HTTPS proxy in the foreground
# This will proxy HTTPS (9473) -> HTTP (9474)
local-ssl-proxy --source 9473 --target 9474
