import { NextResponse } from 'next/server';
import { getPuzzle } from '@/lib/puzzleStore';
import { getRoomByCode } from '@/lib/roomStore';

export async function POST(req: Request) {
const {
roomCode,
answer,
} = await req.json();

if (!roomCode || !answer) {
return NextResponse.json(
{
success: false,
error:
'Room code and answer are required',
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

const puzzle =
await getPuzzle(room.code);

if (!puzzle) {
return NextResponse.json(
{
success: false,
error:
'No active puzzle for that room',
},
{
status: 404,
}
);
}

const correct =
puzzle.answer
.trim()
.toLowerCase() ===
answer
.trim()
.toLowerCase();

return NextResponse.json({
success: true,
correct,
expectedAnswer:
puzzle.answer,
yourAnswer: answer,
});
}
