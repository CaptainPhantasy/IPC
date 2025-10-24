# IPC ACE Deployment Guide

## Prerequisites

- GitHub account with access to `CaptainPhantasy/IPC`
- Vercel account (free tier works)
- LiveKit Cloud account with project created
- API keys ready:
  - LiveKit API Key & Secret
  - OpenAI API Key

## Step 1: Prepare Repository

✅ Already done - code is pushed to GitHub

## Step 2: Deploy Frontend to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Choose `CaptainPhantasy/IPC`
   - Click "Import"

3. **Configure Project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `.next`

4. **Environment Variables**:
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
   LIVEKIT_API_KEY=APICS76dteyebY2
   LIVEKIT_API_SECRET=M5bTybHt8FA6gpeOhVOcYgJ1oqR5P8X5BykWdfwwvjw
   LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://ipc-xyz.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd /Volumes/Storage/Development/IPC/frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_LIVEKIT_URL
vercel env add LIVEKIT_API_KEY
vercel env add LIVEKIT_API_SECRET
vercel env add LIVEKIT_URL

# Redeploy with env vars
vercel --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `ace.ipcpickleball.com`)
4. Follow DNS configuration instructions

## Step 4: Test on Mobile

1. Open the Vercel URL on your mobile device
2. You should see the ACE interface
3. Grant microphone permission when prompted
4. Click the microphone icon and start speaking
5. ACE should respond to your voice

## Step 5: Backend (LiveKit Cloud)

The backend is already deployed on LiveKit Cloud as a worker agent:

- **Status**: ✅ Running
- **LiveKit Project**: ace-rr00kg1j.livekit.cloud
- **Region**: US Central
- **Worker ID**: AW_dZSyMRrseVXN

No additional backend deployment needed - LiveKit Agents runs on their infrastructure.

## Troubleshooting

### Build Fails on Vercel

**Error**: `npm install` fails with peer dependency conflicts

**Solution**: Ensure install command is set to:
```
npm install --legacy-peer-deps
```

### Microphone Not Working

**Error**: "Permission denied" or microphone button greyed out

**Solution**:
- Ensure you're using HTTPS (Vercel provides this automatically)
- Check browser permissions
- Try a different browser (Chrome recommended)

### LiveKit Connection Fails

**Error**: "Failed to connect to LiveKit"

**Solution**:
- Verify environment variables in Vercel are correct
- Check that `NEXT_PUBLIC_LIVEKIT_URL` starts with `wss://`
- Ensure API key and secret match your LiveKit project

### Agent Doesn't Respond

**Error**: Connected but no voice response

**Solution**:
- Check backend logs in LiveKit Cloud dashboard
- Verify OpenAI API key is valid and has credits
- Ensure LiveKit worker is registered (check /tmp/ace-backend.log locally)

## Monitoring

### Vercel Logs
```bash
vercel logs [deployment-url]
```

### LiveKit Dashboard
- Go to https://cloud.livekit.io/projects/ace-rr00kg1j
- View active rooms and connections
- Monitor agent worker status

## Updating Deployment

```bash
# Make changes to code
git add .
git commit -m "Update ACE features"
git push

# Vercel auto-deploys on push to main branch
```

## Environment Variables Reference

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_LIVEKIT_URL` | Public LiveKit WebSocket URL | `wss://ace-rr00kg1j.livekit.cloud` |
| `LIVEKIT_API_KEY` | LiveKit API Key | `APICS76dteyebY2` |
| `LIVEKIT_API_SECRET` | LiveKit API Secret | `M5bTy...` |
| `LIVEKIT_URL` | Server-side LiveKit URL | `wss://ace-rr00kg1j.livekit.cloud` |

### Backend (Local/LiveKit Cloud)

| Variable | Description |
|----------|-------------|
| `LIVEKIT_URL` | LiveKit WebSocket URL |
| `LIVEKIT_API_KEY` | LiveKit API Key |
| `LIVEKIT_API_SECRET` | LiveKit API Secret |
| `OPENAI_API_KEY` | OpenAI API Key |

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected to GitHub repo
- [ ] Environment variables configured in Vercel
- [ ] Deployment successful (green checkmark in Vercel)
- [ ] Website loads on desktop browser
- [ ] Website loads on mobile browser
- [ ] HTTPS enabled (lock icon in address bar)
- [ ] Microphone permission prompt appears
- [ ] Voice conversation works on desktop
- [ ] Voice conversation works on mobile
- [ ] Transcript download works
- [ ] No console errors

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Check LiveKit Cloud dashboard
4. Review this deployment guide

---

**Deployment Date**: October 24, 2025
**Version**: 1.0.0
**Maintainer**: Development Team
