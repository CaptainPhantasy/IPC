# Ace Frontend - Indianapolis Pickleball Club Assistant

Modern Next.js 15 frontend for Ace, the AI voice assistant embodying Chris Sears and the Indianapolis Pickleball Club community.

## Features

- **Next.js 15.5.2**: Latest Next.js with App Router
- **React 19**: Modern React with Server Components
- **LiveKit Integration**: Real-time voice communication
- **TypeScript**: Full type safety
- **Tailwind CSS 4**: Modern styling with utility classes
- **Dark Mode**: Automatic theme switching
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
# or
npm install --legacy-peer-deps
```

2. Configure environment:
```bash
cp .env.local.example .env.local
# Edit .env.local with your LiveKit credentials
```

3. Run development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ace-frontend/
├── app/                    # Next.js App Router
│   ├── (app)/             # Main app group
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── ui/                # Voice UI page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── app/              # App-specific components
│   └── livekit/          # LiveKit UI components
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
├── styles/               # Global styles
└── public/               # Static assets
```

## Environment Variables

Create `.env.local` with:

```bash
LIVEKIT_URL=wss://your-livekit-url
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

## Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format with Prettier

### Component Development

The voice interface uses LiveKit Components React:

```tsx
import { LiveKitRoom } from '@livekit/components-react';

// Connect to LiveKit room for voice chat
<LiveKitRoom
  serverUrl={process.env.LIVEKIT_URL}
  token={token}
  connect={true}
>
  {/* Voice UI components */}
</LiveKitRoom>
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
pnpm build
pnpm start
```

## Technology Stack

- **Framework**: Next.js 15.5.2
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Voice**: LiveKit Components React
- **Icons**: Lucide React, Phosphor Icons
- **Theme**: next-themes
- **Notifications**: sonner

## Design System

### Colors

- **Primary**: Orange (#FF6B35) - Pickleball energy
- **Secondary**: Yellow (#FFB627) - Bright and welcoming
- **Background**: White/Gray gradient
- **Dark Mode**: Gray 800-900

### Typography

- **Sans**: Geist Sans
- **Mono**: Geist Mono

## Contributing

1. Follow the existing code style
2. Use TypeScript for new components
3. Test voice functionality with LiveKit
4. Ensure responsive design

## License

© 2025 Indianapolis Pickleball Club

## Support

For questions about Ace or the Indianapolis Pickleball Club, visit our website or contact Chris Sears.
