# Vercel Deployment - Step by Step

## ✅ Prerequisites Complete
- ✅ Code pushed to GitHub: https://github.com/CaptainPhantasy/IPC
- ✅ Repository is ready for deployment

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Import Project

1. **Go to Vercel**: https://vercel.com/new
   - Sign in with your GitHub account if not already logged in

2. **Import Repository**:
   - Click "Add New" → "Project"
   - You should see `CaptainPhantasy/IPC` in the list
   - Click "Import" next to it

### Step 2: Configure Build Settings

**IMPORTANT**: Configure these settings before deploying:

1. **Root Directory**:
   ```
   frontend
   ```
   ⚠️ This is critical - the frontend code is in the `frontend/` subdirectory

2. **Framework Preset**:
   - Should auto-detect as **Next.js**
   - If not, select "Next.js" from dropdown

3. **Build Command**:
   ```
   npm run build
   ```

4. **Install Command**:
   ```
   npm install --legacy-peer-deps
   ```
   ⚠️ This is critical - prevents peer dependency errors

5. **Output Directory**:
   ```
   .next
   ```
   (This should be auto-filled)

### Step 3: Add Environment Variables

Click "Environment Variables" section and add these **4 variables**:

#### Variable 1:
- **Name**: `NEXT_PUBLIC_LIVEKIT_URL`
- **Value**: `wss://ace-rr00kg1j.livekit.cloud`

#### Variable 2:
- **Name**: `LIVEKIT_API_KEY`
- **Value**: `APICS76dteyebY2`

#### Variable 3:
- **Name**: `LIVEKIT_API_SECRET`
- **Value**: `M5bTybHt8FA6gpeOhVOcYgJ1oqR5P8X5BykWdfwwvjw`

#### Variable 4:
- **Name**: `LIVEKIT_URL`
- **Value**: `wss://ace-rr00kg1j.livekit.cloud`

⚠️ Make sure all 4 variables are added before deploying!

### Step 4: Deploy

1. Click the blue "Deploy" button
2. Wait 2-3 minutes for the build to complete
3. You'll see a success screen with your deployment URL

### Step 5: Test on Desktop

1. Click "Visit" or copy the Vercel URL (e.g., `https://ipc-xyz.vercel.app`)
2. Open in your browser
3. You should see the ACE interface
4. Click to start a session
5. **Grant microphone permission** when prompted
6. Test voice conversation

### Step 6: Test on Mobile

1. **Open the Vercel URL on your phone**:
   - Type the URL in your mobile browser
   - Or scan a QR code (Vercel provides this in the dashboard)

2. **Grant microphone permission**:
   - Since it's HTTPS, your phone will prompt for microphone access
   - Click "Allow"

3. **Test voice**:
   - Click the microphone icon
   - Start speaking
   - ACE should respond

## 🎯 Success Checklist

After deployment, verify:

- [ ] Deployment shows "Ready" status in Vercel
- [ ] Website loads (no 404 or 500 errors)
- [ ] HTTPS is enabled (lock icon in browser)
- [ ] Desktop: microphone permission prompt appears
- [ ] Desktop: voice conversation works
- [ ] Mobile: website loads correctly
- [ ] Mobile: microphone permission prompt appears
- [ ] Mobile: voice conversation works
- [ ] No console errors (press F12 on desktop)

## 🐛 Troubleshooting

### Build Fails

**Error**: `npm install` fails or peer dependency errors

**Fix**:
1. Go to Project Settings → General
2. Scroll to "Build & Development Settings"
3. Override Install Command with: `npm install --legacy-peer-deps`
4. Click "Save"
5. Go to Deployments tab
6. Click "..." on latest deployment → "Redeploy"

### Website Loads but Shows 404

**Error**: Getting 404 for `/ui` route

**Fix**:
1. Verify Root Directory is set to `frontend` (not `frontend/`)
2. Check that vercel.json is present in the root
3. Redeploy

### Microphone Doesn't Work

**Error**: "Permission denied" or microphone button greyed out

**Fix on Desktop**:
1. Check that URL starts with `https://` (Vercel provides this automatically)
2. Click lock icon in address bar → Site settings → Microphone → Allow
3. Refresh page

**Fix on Mobile**:
1. Check browser permissions: Settings → Safari/Chrome → Website Settings
2. Clear browser cache
3. Try a different browser (Chrome recommended)

### Agent Doesn't Respond

**Error**: Connected but no voice response

**Fix**:
1. Check browser console (F12) for errors
2. Verify all 4 environment variables are set in Vercel
3. Check LiveKit dashboard: https://cloud.livekit.io/projects/ace-rr00kg1j
4. Verify backend worker is running (should see "registered worker" in local logs)

### Can't Connect to LiveKit

**Error**: "Failed to connect" or connection timeout

**Fix**:
1. Verify `NEXT_PUBLIC_LIVEKIT_URL` starts with `wss://`
2. Check LiveKit API key and secret are correct
3. Go to Vercel → Project → Settings → Environment Variables
4. Verify all values match exactly (no extra spaces)
5. Redeploy after fixing

## 📱 QR Code for Mobile Testing

After deployment:
1. Go to your Vercel project dashboard
2. Click on the deployment
3. Click "Share" button
4. Vercel will show a QR code
5. Scan with your phone to open directly

## 🔄 Updating the App

After making code changes:

```bash
cd /Volumes/Storage/Development/IPC
git add .
git commit -m "Update ACE features"
git push
```

Vercel will automatically:
- Detect the push
- Build the new version
- Deploy automatically
- Your URL stays the same

## 🎨 Custom Domain (Optional)

To use a custom domain (e.g., `ace.ipcpickleball.com`):

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

## 📊 Monitoring

### View Deployment Logs
1. Go to Vercel dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click on a deployment to see logs

### View Runtime Logs
1. Go to project dashboard
2. Click "Logs" tab
3. See real-time logs from your application

### Check LiveKit Status
1. Go to https://cloud.livekit.io
2. Click on "ace-rr00kg1j" project
3. View active rooms and connections
4. See agent worker status

## 🎉 You're Done!

Your ACE agent is now live and accessible from anywhere with HTTPS enabled!

**Desktop URL**: https://your-project.vercel.app
**Mobile**: Same URL works on mobile devices

The microphone issue is completely solved because Vercel provides HTTPS by default! 🎤✅

---

**Need Help?**
- Check the browser console for errors (F12)
- Review Vercel deployment logs
- Check LiveKit Cloud dashboard
- See DEPLOYMENT.md for detailed troubleshooting
