import { NextResponse } from 'next/server';
import { createRoom } from '@/lib/roomStore';
import { getUserIdFromRequest } from '@/lib/session';

export async function POST(req: Request) {
  const hostUserId = getUserIdFromRequest(req);
  const room = createRoom(hostUserId);

  return NextResponse.json({
    success: true,
    roomCode: room.code,
    message: `Room created for ${hostUserId ? 'logged-in user' : 'guest'}`,
  });
}
