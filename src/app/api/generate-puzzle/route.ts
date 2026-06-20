import { NextResponse } from 'next/server';
import { generatePuzzle } from '@/lib/gemini';
import { getRoomByCode } from '@/lib/roomStore';

export async function POST(req: Request) {
const { roomCode } = await req.json();

if (!roomCode) {
return NextResponse.json(
{
success: false,
error: 'Missing room code',
},
{
status: 400,
}
);
}

const room = getRoomByCode(roomCode);

if (!room) {
return NextResponse.json(
{
success: false,
error: 'Room not found',
},
{
status: 404,
}
);
}

const puzzles = await generatePuzzle(room.code);

return NextResponse.json({
success: true,
puzzles,
});
}
