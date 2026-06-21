import { supabase } from './supabase';

export interface StoredPuzzle {
roomCode: string;
question: string;
hint: string;
answer: string;
createdAt: string;
}

export async function savePuzzle(
roomCode: string,
puzzle: Omit<StoredPuzzle, 'roomCode'>
) {
await supabase
.from('puzzles')
.delete()
.eq(
'room_code',
roomCode.trim().toUpperCase()
);

const { error } = await supabase
.from('puzzles')
.insert({
room_code:
roomCode.trim().toUpperCase(),
question: puzzle.question,
answer: puzzle.answer,
hint: puzzle.hint,
created_at: puzzle.createdAt,
});

if (error) {
throw error;
}

return {
roomCode:
roomCode.trim().toUpperCase(),
...puzzle,
};
}

export async function getPuzzle(
roomCode: string
): Promise<StoredPuzzle | null> {
const { data } = await supabase
.from('puzzles')
.select('*')
.eq(
'room_code',
roomCode.trim().toUpperCase()
)
.order('created_at', {
ascending: false,
})
.limit(1)
.single();

if (!data) {
return null;
}

return {
roomCode:
roomCode.trim().toUpperCase(),
question: data.question,
hint: data.hint,
answer: data.answer,
createdAt: data.created_at,
};
}

export async function clearPuzzle(
roomCode: string
) {
await supabase
.from('puzzles')
.delete()
.eq(
'room_code',
roomCode.trim().toUpperCase()
);
}
