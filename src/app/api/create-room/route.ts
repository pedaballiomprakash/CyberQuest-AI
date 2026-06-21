import { NextResponse } from 'next/server';
import { createRoom } from '@/lib/roomStore';
import { getUserIdFromRequest } from '@/lib/session';

export async function POST(req: Request) {
const hostUserId =
await getUserIdFromRequest(req);

const room = await createRoom(
hostUserId ?? undefined
);

return NextResponse.json({
success: true,
roomCode: room.code,
message: 'Room created',
});
}

