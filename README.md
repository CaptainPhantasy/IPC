# IPC (Indianapolis Pickleball Club) AI Agent

ACE is a voice-enabled AI agent built for the Indianapolis Pickleball Club, powered by LiveKit and OpenAI.

## 🚀 Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install --legacy-peer-deps
cp .env.example .env.local
# Add your LiveKit credentials to .env.local
npm run dev
```

Access at: http://localhost:3000

### Backend (Python + LiveKit Agents)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your API keys to .env
python src/agent.py dev
```

## 📦 Deployment

### Vercel (Frontend)

1. **Import Project**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import from GitHub: `CaptainPhantasy/IPC`
   - Root Directory: `frontend`

2. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
   ```

3. **Deploy Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`
   - Output Directory: `.next`

4. **Deploy**: Click "Deploy"

### LiveKit Cloud (Backend)

The backend agent runs on LiveKit Cloud infrastructure. See `/backend/README.md` for detailed deployment instructions.

## 🎤 Features

- **Voice Conversation**: Real-time voice interaction with the AI agent
- **LiveKit Integration**: Low-latency audio streaming
- **OpenAI Realtime API**: Natural conversation capabilities
- **Mobile-Friendly**: HTTPS-enabled for microphone access on mobile devices
- **Transcript Download**: Save conversation history

## 🏗️ Architecture

```
frontend/          - Next.js 15 + React 19 + LiveKit Components
backend/           - Python + LiveKit Agents SDK + OpenAI
```

## 📱 Mobile Testing

Once deployed to Vercel, the app will automatically have HTTPS, enabling microphone access on mobile devices:

1. Open the Vercel URL on your phone (e.g., `https://ipc-xyz.vercel.app`)
2. Grant microphone permission when prompted
3. Start speaking with the ACE agent

## 🔧 Local Development

See `frontend/QUICK_START_MICROPHONE.md` for troubleshooting local microphone access.

## 📄 License

Proprietary - Indianapolis Pickleball Club

## 🤝 Support

For issues or questions, contact the development team.
