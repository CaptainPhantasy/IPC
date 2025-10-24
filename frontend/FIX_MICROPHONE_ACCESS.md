# ACE Microphone Access Fix

## Problem
The ACE agent can't hear you because:
1. The frontend is running on **HTTP** (not HTTPS)
2. Modern browsers require **HTTPS** for microphone access
3. Browser microphone permissions are blocked

## Solution: Enable HTTPS for Local Development

### Option 1: Quick Fix - Browser Permissions (Temporary)

#### Chrome/Edge
1. Navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Add `http://localhost:9473` to the list
3. Restart browser
4. Go to `http://localhost:9473/ui`
5. Click the lock icon in address bar → Site settings → Microphone → Allow

#### Safari
1. Go to Safari → Settings → Websites → Microphone
2. Set `localhost` to "Allow"
3. Reload the page

#### Firefox
1. Navigate to `about:config`
2. Search for `media.devices.insecure.enabled`
3. Set to `true`
4. Reload the page

### Option 2: HTTPS Setup (Recommended)

Create self-signed SSL certificates for localhost:

```bash
# Navigate to ace-frontend directory
cd /Volumes/Storage/Development/Sage/SAGEv2/SAGEv3/ace-frontend

# Create SSL directory
mkdir -p .ssl

# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout .ssl/localhost-key.pem -out .ssl/localhost-cert.pem -days 365 -nodes -subj "/CN=localhost"
```

Then update your start script to use HTTPS:

```bash
# Kill existing process
lsof -ti:9473 | xargs kill -9 2>/dev/null

# Start with HTTPS
HTTPS=true SSL_CRT_FILE=.ssl/localhost-cert.pem SSL_KEY_FILE=.ssl/localhost-key.pem PORT=9473 npm run dev
```

Access at: `https://localhost:9473/ui`

**Note**: You'll see a security warning in your browser. Click "Advanced" → "Proceed to localhost" to continue.

### Option 3: Use ngrok for Public HTTPS URL

```bash
# Install ngrok if not already installed
brew install ngrok

# Create tunnel to your local server
ngrok http 9473
```

This gives you a public HTTPS URL like `https://abc123.ngrok.io` that you can use.

## Verification Steps

Once HTTPS is enabled:

1. Open the ACE UI
2. You should see a browser prompt asking for microphone permission
3. Click "Allow"
4. The microphone button should show as enabled (not crossed out)
5. Try speaking - you should see audio waveforms or visual feedback

## Additional Checks

If microphone still doesn't work:

1. Check browser console (F12) for errors
2. Verify microphone is working in System Settings
3. Check that no other app is using the microphone
4. Try a different browser
5. Check LiveKit connection status in the logs

## Backend Check

Verify the backend is running and connected to LiveKit:

```bash
tail -f /tmp/ace-backend.log
```

You should see:
- "registered worker" message
- LiveKit cloud connection established
- No errors about audio codecs or permissions
