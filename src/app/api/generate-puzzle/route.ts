import { NextResponse } from 'next/server';
import { generatePuzzle } from '@/lib/gemini';
import { getRoomByCode } from '@/lib/roomStore';
import { savePuzzle } from '@/lib/puzzleStore';

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

const room =
await getRoomByCode(roomCode);

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

const puzzles =
await generatePuzzle(room.code);

if (
Array.isArray(puzzles) &&
puzzles.length > 0
) {
await savePuzzle(room.code, {
question:
puzzles[0].question,
hint: puzzles[0].hint,
answer:
puzzles[0].answer,
createdAt:
new Date().toISOString(),
});
}

return NextResponse.json({
success: true,
puzzles,
});
}
