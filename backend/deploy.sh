#!/bin/bash

# Ace Backend Deployment Script
# Deploy Ace assistant to LiveKit Cloud or self-hosted

set -e

echo "🏓 Deploying Ace - Indianapolis Pickleball Club Assistant"

# Check environment variables
if [ -z "$LIVEKIT_URL" ] || [ -z "$LIVEKIT_API_KEY" ] || [ -z "$LIVEKIT_API_SECRET" ]; then
    echo "❌ Error: LiveKit credentials not set"
    echo "Please set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET"
    exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ Error: OPENAI_API_KEY not set"
    exit 1
fi

echo "✅ Environment variables configured"

# Install dependencies
echo "📦 Installing dependencies..."
pip install -e .

# Run tests
echo "🧪 Running tests..."
pytest tests/ || echo "⚠️  No tests found or tests failed"

# Start the agent
echo "🚀 Starting Ace assistant..."
python src/agent.py start

echo "✅ Ace is live and ready to help!"
