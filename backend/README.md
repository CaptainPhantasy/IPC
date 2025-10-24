# Ace Backend - Indianapolis Pickleball Club Assistant

**Ace** is an AI-powered voice assistant designed to embody the charismatic spirit of Chris Sears, founder of the Indianapolis Pickleball Club. Built with LiveKit Agents and OpenAI, Ace provides an engaging, knowledgeable, and enthusiastic assistant for all things pickleball.

## Features

- **Voice-First Interaction**: Real-time voice conversations powered by LiveKit
- **Chris Sears Persona**: Embodies the founder's charismatic and welcoming personality
- **Pickleball Expertise**: Deep knowledge of pickleball rules, techniques, and community
- **Event Management**: Information about club events, schedules, and activities
- **Community Building**: Helps connect members and foster club culture

## Architecture

- **LiveKit Agents SDK**: Real-time voice interaction framework
- **OpenAI Realtime API**: GPT-4 with voice capabilities
- **Python 3.9+**: Modern async Python architecture
- **Google Cloud TTS**: Additional voice synthesis options

## Setup

1. Install dependencies:
```bash
pip install -e .
```

2. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

3. Run the agent:
```bash
python src/agent.py dev
```

## Environment Variables

- `LIVEKIT_URL`: Your LiveKit server URL
- `LIVEKIT_API_KEY`: LiveKit API key
- `LIVEKIT_API_SECRET`: LiveKit API secret
- `OPENAI_API_KEY`: OpenAI API key for GPT-4
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to Google Cloud credentials (optional)

## Development

Run tests:
```bash
pytest
```

Format code:
```bash
ruff format .
```

Lint code:
```bash
ruff check .
```

## Deployment

See the deployment guide for instructions on deploying Ace to production.

## About Indianapolis Pickleball Club

Founded by Chris Sears, the Indianapolis Pickleball Club is dedicated to growing the sport of pickleball in the Indianapolis area, fostering community, and providing top-notch facilities and events for players of all skill levels.
