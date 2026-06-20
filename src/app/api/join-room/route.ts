import { NextResponse } from 'next/server';
import { getRoomByCode } from '@/lib/roomStore';

export async function POST(req: Request) {
  const { roomCode } = await req.json();
  if (!roomCode || typeof roomCode !== 'string' || roomCode.trim().length !== 6) {
    return NextResponse.json({ success: false, error: 'Invalid room code' }, { status: 400 });
  }

  const room = getRoomByCode(roomCode);
  if (!room) {
    return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, joined: true, roomCode: room.code });
}
