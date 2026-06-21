import { NextResponse } from 'next/server';
import { getPuzzle } from '@/lib/puzzleStore';

export async function GET(req: Request) {
const url = new URL(req.url);

const roomCode =
url.searchParams.get(
'roomCode'
);

if (!roomCode) {
return NextResponse.json(
{
success: false,
error:
'roomCode is required',
},
{
status: 400,
}
);
}

const puzzle =
await getPuzzle(roomCode);

if (!puzzle) {
return NextResponse.json({
success: true,
hint: `Could not find an active puzzle for room ${roomCode}. Try generating a new one.`,
});
}

return NextResponse.json({
success: true,
hint: puzzle.hint,
});
}

