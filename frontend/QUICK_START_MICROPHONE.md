# Quick Start: Enable ACE Microphone Access

## The Problem
You're seeing "This site can't provide a secure connection" because Next.js dev mode doesn't support HTTPS by default, and browsers require HTTPS for microphone access.

## ✅ FASTEST SOLUTION (2 minutes)

### Option A: Chrome Flag (Recommended - No Installation)

1. **Open a new Chrome tab** and paste this URL:
   ```
   chrome://flags/#unsafely-treat-insecure-origin-as-secure
   ```

2. **Add localhost:9473** to the text field:
   ```
   http://localhost:9473
   ```

3. **Change the dropdown** from "Default" to "Enabled"

4. **Click "Relaunch"** button at the bottom

5. **Go back to the ACE app**:
   ```
   http://localhost:9473/ui
   ```

6. **Grant microphone permission** when the browser asks

✅ **Done!** Your microphone should now work.

---

## Alternative Solutions

### Option B: HTTPS Proxy (More Secure)

Run these commands:

```bash
cd /Volumes/Storage/Development/Sage/SAGEv2/SAGEv3/ace-frontend

# Install the HTTPS proxy tool
npm install -g local-ssl-proxy

# Start the HTTPS-enabled server
./setup-https-proxy.sh
```

Then access: `https://localhost:9473/ui`

### Option C: Use ngrok (Public URL)

```bash
# Install ngrok
brew install ngrok

# In one terminal, start the ACE frontend normally
cd /Volumes/Storage/Development/Sage/SAGEv2/SAGEv3/ace-frontend
PORT=9473 npm run dev

# In another terminal, create HTTPS tunnel
ngrok http 9473
```

Use the `https://` URL that ngrok provides (e.g., `https://abc123.ngrok.io/ui`)

---

## Troubleshooting

### After enabling Chrome flag, still no microphone?

1. **Check browser console** (F12 → Console tab) for errors
2. **Verify microphone permission**:
   - Click the lock icon in the address bar
   - Check if microphone is set to "Allow"
3. **Try clearing browser data**:
   - Settings → Privacy → Clear browsing data → Cached images and files
4. **Check System Settings**:
   - macOS: System Settings → Privacy & Security → Microphone → Chrome (enabled)

### Server won't start?

```bash
# Kill any existing processes
lsof -ti:9473 | xargs kill -9
lsof -ti:9474 | xargs kill -9

# Clear Next.js cache
cd /Volumes/Storage/Development/Sage/SAGEv2/SAGEv3/ace-frontend
rm -rf .next

# Restart
PORT=9473 npm run dev
```

### Still having issues?

1. **Test your microphone**:
   ```bash
   open /Volumes/Storage/Development/Sage/SAGEv2/SAGEv3/ace-frontend/check-microphone.html
   ```

2. **Check backend logs**:
   ```bash
   tail -f /tmp/ace-backend.log
   ```

3. **Verify LiveKit connection**:
   - Backend should show "registered worker" message
   - Frontend should show agent as "available"

---

## Current Server Status

Your ACE frontend is currently running on:
- **URL**: http://localhost:9473/ui
- **Port**: 9473
- **Protocol**: HTTP (needs microphone permission via Chrome flag)

Backend is running on:
- **LiveKit**: wss://ace-rr00kg1j.livekit.cloud
- **Worker Status**: Registered and ready

---

## Next Steps After Microphone Works

1. Click the microphone button to ensure it's enabled (not crossed out)
2. Speak into your microphone
3. You should see visual feedback (waveforms or activity indicators)
4. The ACE agent should respond to your voice
5. Check the transcript to verify your words are being captured

Need more help? Check the console logs or backend logs for specific errors.
