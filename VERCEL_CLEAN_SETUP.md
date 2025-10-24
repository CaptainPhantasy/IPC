# Clean Vercel Setup - IPC ACE Agent

## Step 1: Import Project

1. Go to: https://vercel.com/new
2. Import `CaptainPhantasy/IPC` from GitHub
3. Click "Import"

## Step 2: Configure Settings (IMPORTANT - Do this BEFORE deploying)

### Root Directory
```
frontend
```

### Framework Preset
```
Next.js
```
(Should auto-detect)

### Build Settings

**Build Command**: Leave default
```
(empty - uses npm run build)
```

**Output Directory**: Leave default
```
(empty - uses .next)
```

**Install Command**: **OVERRIDE THIS**
- Toggle "Override" ON
- Enter:
```
npm install --legacy-peer-deps
```

**Development Command**: Leave default
```
next
```

## Step 3: Environment Variables

Add these 4 variables (click "Add Another" between each):

### Variable 1
```
Name: NEXT_PUBLIC_LIVEKIT_URL
Value: wss://ace-rr00kg1j.livekit.cloud
```

### Variable 2
```
Name: LIVEKIT_API_KEY
Value: APICS76dteyebY2
```

### Variable 3
```
Name: LIVEKIT_API_SECRET
Value: M5bTybHt8FA6gpeOhVOcYgJ1oqR5P8X5BykWdfwwvjw
```

### Variable 4
```
Name: LIVEKIT_URL
Value: wss://ace-rr00kg1j.livekit.cloud
```

## Step 4: Deploy

Click **"Deploy"** button

Wait 2-3 minutes for build to complete.

## Step 5: Test

You'll get a URL like: `https://ipc-xyz.vercel.app`

Test these paths:
- `/` - Should show the landing page with "Meet Ace" hero
- `/ui` - Should show the voice assistant interface
- `/about` - Should show the about page

## Settings Summary (Copy-Paste Ready)

```
Root Directory: frontend
Framework: Next.js
Install Command: npm install --legacy-peer-deps (Override ON)
Build Command: (default)
Output Directory: (default)

Environment Variables:
NEXT_PUBLIC_LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
LIVEKIT_API_KEY=APICS76dteyebY2
LIVEKIT_API_SECRET=M5bTybHt8FA6gpeOhVOcYgJ1oqR5P8X5BykWdfwwvjw
LIVEKIT_URL=wss://ace-rr00kg1j.livekit.cloud
```

## What NOT to Do

❌ Don't set Framework to "Other"
❌ Don't override Output Directory
❌ Don't override Build Command
❌ Don't add Production Overrides
❌ Don't set Root Directory to anything other than "frontend"

## Success Checklist

After deployment completes:
- [ ] Build shows "Ready" status (green checkmark)
- [ ] Homepage loads (shows ACE branding)
- [ ] `/ui` route works (shows voice interface)
- [ ] HTTPS is enabled (lock icon in address bar)
- [ ] Can test on mobile

---

**That's it!** Just these settings and it should work perfectly.
