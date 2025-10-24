# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ace** is an AI-powered voice assistant for the Indianapolis Pickleball Club, embodying founder Chris Sears' enthusiasm and knowledge. Built with LiveKit Agents and OpenAI Realtime API, it provides 24/7 voice-first support for club members.

**Architecture**: Monorepo with Python backend (LiveKit Agent) and Next.js 15 frontend (React 19 + LiveKit Components)

## Directory Structure

```
SAGEv3/
├── ace-backend/          # Python LiveKit Agent
│   ├── src/
│   │   └── agent.py      # Main agent with Chris Sears persona
│   ├── pyproject.toml    # Python dependencies
│   └── Dockerfile        # Container configuration
│
└── ace-frontend/         # Next.js 15 + React 19 frontend
    ├── app/              # Next.js App Router
    │   ├── api/          # API routes (token generation)
    │   ├── ui/           # Voice interface page
    │   └── about/        # About page
    ├── components/
    │   ├── app/          # App-specific components
    │   └── livekit/      # LiveKit UI components
    └── lib/              # Utilities (storage, transcripts, utils)
```

## Development Commands

### Backend

```bash
cd ace-backend

# Install dependencies
pip install -e .

# Run in development mode (auto-reload)
python src/agent.py dev

# Run in production mode
python src/agent.py start

# Run tests
pytest tests/

# Lint/format code
ruff check .
ruff format .
```

### Frontend

```bash
cd ace-frontend

# Install dependencies (ALWAYS use --legacy-peer-deps)
npm install --legacy-peer-deps
# or use pnpm install

# Development server (uses Turbopack)
npm run dev

# Production build
npm run build
npm start

# Lint and format
npm run lint
npm run format
npm run format:check
```

### Full Stack Testing

```bash
# Quick start script (sets up both)
./test-ace-local.sh

# Manual: Terminal 1 (Backend)
cd ace-backend
source venv/bin/activate
python src/agent.py dev

# Manual: Terminal 2 (Frontend, uses port 3000 by default)
cd ace-frontend
npm run dev
```

## Environment Configuration

### Backend (.env.local)

```bash
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxxx
LIVEKIT_API_SECRET=your-secret-key
OPENAI_API_KEY=sk-proj-xxxxx
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json  # Optional
```

### Frontend (.env.local)

```bash
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=APIxxxxxxxxx
LIVEKIT_API_SECRET=your-secret-key
```

**Important**: Frontend and backend must use the same LiveKit credentials.

## Architecture Details

### Backend Agent Architecture

- **Framework**: LiveKit Agents SDK v1.2+ with OpenAI plugin
- **Voice Model**: OpenAI Realtime API with "nova" voice
- **Turn Detection**: Server-side VAD (Voice Activity Detection)
- **Noise Cancellation**: Silero plugin enabled
- **Persona**: Extensive instructions in `agent.py` (lines 28-250+) define Chris Sears' personality, IPC knowledge, and conversation tactics
- **Alternative Voice**: Google Cloud TTS (Chirp 3 HD) available via `agent_google.py`

**Key Files**:
- `src/agent.py` - Main production agent (OpenAI Realtime API)
- `src/agent_google.py` - Alternative with Google TTS
- `src/agent_optimized.py` - 55% reduced prompt version (reference)
- `src/agent_original_backup.py` - Original backup

### Frontend Architecture

- **Framework**: Next.js 15.5.2 with App Router and React 19
- **Styling**: Tailwind CSS 4
- **LiveKit Integration**: `@livekit/components-react` v2.9.15+
- **Token Generation**: API route at `/api/connection-details` generates JWT tokens using `livekit-server-sdk`
- **Voice UI**: Modular component system in `components/app/` and `components/livekit/`

**Key Components**:
- `app/ui/page.tsx` - Voice interface entry point
- `app/api/connection-details/route.ts` - JWT token generation for LiveKit rooms
- `components/app/session-view.tsx` - Main conversation UI
- `components/app/tile-layout.tsx` - LiveKit room layout
- `components/livekit/waveform-visualizer.tsx` - Audio visualizations

**LiveKit Room Connection Flow**:
1. Frontend requests token from `/api/connection-details`
2. Backend generates JWT with room permissions
3. Frontend connects to LiveKit room using token
4. Python agent joins same room automatically
5. Voice conversation begins

### Technology Stack Specifics

**Backend**:
- Python 3.9+ (tested on 3.11, 3.13)
- Dependencies: `livekit-agents[silero,turn-detector,openai,google]`, `python-dotenv`
- Plugins: Silero (VAD), OpenAI (realtime voice), Google (TTS alternative), noise cancellation

**Frontend**:
- Node.js 18+
- Package manager: pnpm (preferred) or npm with `--legacy-peer-deps`
- Key dependencies: Next.js 15.5.2, React 19, LiveKit Components, Tailwind CSS 4
- Icons: Lucide React, Phosphor Icons
- State: React Context via `session-provider.tsx`

## Common Development Tasks

### Modifying Ace's Personality

Edit `ace-backend/src/agent.py`, specifically the `instructions` parameter in the `AceAssistant` class (line 28):

```python
class AceAssistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are Ace, the enthusiastic voice assistant...""",
            voice="nova",
            turn_detection="server_vad",
        )
```

After changes:
```bash
# Restart the agent (Ctrl+C, then)
python src/agent.py dev
```

### Adding New Frontend Features

1. Create component in `components/app/` or `components/livekit/`
2. Import in relevant page (e.g., `app/ui/page.tsx`)
3. Test with hot reload (Next.js auto-reloads)

### Debugging Voice Issues

**Backend**:
- Check logs for "Ace assistant initialized successfully"
- Verify OpenAI API key is valid and has credits
- Test with: `python -c "from dotenv import load_dotenv; load_dotenv('.env.local'); import os; print(os.getenv('OPENAI_API_KEY'))"`

**Frontend**:
- Open browser DevTools Console (check for WebSocket errors)
- Verify microphone permissions granted
- Check Network tab for `/api/connection-details` response
- Ensure HTTPS in production (localhost works with HTTP)

**LiveKit Connection**:
- Verify same `LIVEKIT_URL` in both backend and frontend
- Check LiveKit dashboard for active rooms
- Ensure WebSocket URL starts with `wss://`

### Port Conflicts

Frontend defaults to port 3000:
```bash
# Use custom port
PORT=3001 npm run dev

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Testing

### Voice Conversation Testing

1. Start backend: `python src/agent.py dev`
2. Start frontend: `npm run dev`
3. Visit http://localhost:3000
4. Click "Talk to Ace" button
5. Test queries:
   - "What are your hours?"
   - "Tell me about Indianapolis Pickleball Club"
   - "Who is Chris Sears?"
   - "What's Moneyball?"

### Test Coverage

**Backend**: `pytest tests/` (currently minimal test suite)
**Frontend**: `npm run lint` and `npm run build` for validation

## Deployment

### Backend Deployment Options

**Docker** (Recommended):
```bash
cd ace-backend
docker build -t ace-backend .
docker run -d --name ace-backend \
  -e LIVEKIT_URL=$LIVEKIT_URL \
  -e LIVEKIT_API_KEY=$LIVEKIT_API_KEY \
  -e LIVEKIT_API_SECRET=$LIVEKIT_API_SECRET \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  ace-backend
```

**Direct** (Background process):
```bash
nohup python src/agent.py start > logs/ace.log 2>&1 &
```

### Frontend Deployment

**Vercel** (Recommended):
```bash
cd ace-frontend
vercel deploy --prod
```

Environment variables must be set in Vercel dashboard.

### Pre-Deployment Checklist

- [ ] Backend agent connects to LiveKit successfully
- [ ] Frontend generates tokens correctly
- [ ] Voice conversation works end-to-end
- [ ] All environment variables configured in production
- [ ] HTTPS enabled for frontend (required for microphone access)

## Project Context

### SAGE Connection

This codebase is part of SAGEv3 (parent directory `/Volumes/Storage/Development/Sage/SAGEv2/SAGEv3`). SAGE is a broader empathetic AI platform with:
- Emotion tracking and visualization (incomplete)
- LiveKit integration (shared with Ace)
- FastAPI backend (separate from Ace's LiveKit agent)

**Important**: Ace is a standalone voice assistant project that reuses SAGE infrastructure but operates independently. The `/ace` route in `../sage-frontend` is hidden and redirects to this project.

### Indianapolis Pickleball Club (IPC)

Ace's knowledge base includes:
- 2 locations (IPC East main, IPC South temporary)
- 9 indoor courts, 24/7 access
- Staff (Chris Sears, Ryan Atkinson, Jaci Keller, pros)
- Programs (leagues, DUPR, events, Rally for Riley)
- Policies (timing, cancellations, etiquette)

All details encoded in `agent.py` instructions (lines 28-250+).

## Known Issues and Limitations

### Current MVP Limitations

- **No booking capability**: Ace directs users to CourtReserve for reservations
- **No account status**: Cannot check membership or payment information
- **Read-only**: Provides information only, cannot modify data

### Technical Debt

- Frontend `.next/` cache can become stale (fix: `rm -rf .next && npm run dev`)
- npm requires `--legacy-peer-deps` flag due to React 19 peer dependencies
- Limited automated test coverage
- No CI/CD pipeline configured

### Browser Compatibility

- Requires modern browser with WebRTC support
- Microphone access requires HTTPS in production (localhost OK for dev)
- Tested on Chrome, Safari, Firefox (latest versions)

## Additional Resources

- **Full Setup**: See `SETUP.md` for detailed setup instructions
- **Quick Start**: See `QUICK_START.md` for 5-minute deployment
- **Backend Details**: See `ace-backend/README.md`
- **Frontend Details**: See `ace-frontend/README.md`
- **LiveKit Docs**: https://docs.livekit.io/agents/quickstart/
- **OpenAI Realtime API**: https://platform.openai.com/docs/guides/realtime

## File Naming Conventions

- **Backend**: Snake_case Python files (`agent.py`, `agent_google.py`)
- **Frontend**: Kebab-case TypeScript files (`session-view.tsx`, `tile-layout.tsx`)
- **Components**: React components use PascalCase exports in kebab-case files
- **Environment**: `.env.local` for local secrets (gitignored), `.env.example` for templates

## Important Notes for AI Assistants

1. **Voice-First Design**: This is not a chatbot - it's a voice conversation system. Always test with actual voice.

2. **Persona Preservation**: The Chris Sears personality in `agent.py` is critical. Changes should maintain authenticity, enthusiasm, and IPC knowledge accuracy.

3. **LiveKit Room Lifecycle**: Backend agent auto-joins rooms created by frontend. Don't create rooms manually unless testing.

4. **npm/pnpm Usage**: Always use `npm install --legacy-peer-deps` or `pnpm install`. Never use `npm install` without the flag.

5. **Environment Variables**: Backend and frontend MUST use identical LiveKit credentials for connection to work.

6. **Cache Issues**: If frontend behaves strangely, first step is `rm -rf .next node_modules && npm install --legacy-peer-deps`.

7. **Agent Variants**: Multiple agent files exist for historical/testing purposes. `agent.py` is production version.
