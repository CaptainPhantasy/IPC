import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

async function generateToken(roomName: string, participantName: string) {
  if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
    throw new Error('Server misconfigured: Missing LiveKit credentials');
  }

  // Create access token
  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: participantName,
    ttl: '10m',
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  });

  const token = await at.toJwt();

  return {
    serverUrl: LIVEKIT_URL,
    roomName: roomName,
    participantToken: token,
    participantName: participantName,
  };
}

export async function GET(request: NextRequest) {
  try {
    const roomName = request.nextUrl.searchParams.get('roomName') ?? 'ace-room';
    const participantName =
      request.nextUrl.searchParams.get('participantName') ?? 'guest';

    const connectionDetails = await generateToken(roomName, participantName);
    return NextResponse.json(connectionDetails);
  } catch (error) {
    console.error('Error generating connection details:', error);
    return NextResponse.json(
      { error: 'Failed to generate connection details' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const roomName = body.roomName ?? 'ace-room';
    const participantName = body.participantName ?? 'guest';

    const connectionDetails = await generateToken(roomName, participantName);
    return NextResponse.json(connectionDetails);
  } catch (error) {
    console.error('Error generating connection details:', error);
    return NextResponse.json(
      { error: 'Failed to generate connection details' },
      { status: 500 }
    );
  }
}
