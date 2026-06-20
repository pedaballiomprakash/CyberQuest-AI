import db from './db';

export interface StoredPuzzle {
  roomCode: string;
  question: string;
  hint: string;
  answer: string;
  createdAt: string;
}

export function savePuzzle(roomCode: string, puzzle: Omit<StoredPuzzle, 'roomCode'>) {
  const room = db.prepare('SELECT id FROM rooms WHERE code = ?').get(roomCode.trim().toUpperCase());
  if (!room) {
    return null;
  }

  const roomId = room.id;
  const existing = db.prepare('SELECT id FROM puzzles WHERE room_id = ?').get(roomId);
  if (existing) {
    db.prepare('DELETE FROM puzzles WHERE room_id = ?').run(roomId);
  }

  const id = `puzzle_${Math.random().toString(36).slice(2, 12)}`;
  db.prepare('INSERT INTO puzzles (id, room_id, question, answer, hint, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, roomId, puzzle.question, puzzle.answer, puzzle.hint, puzzle.createdAt);

  return {
    roomCode: roomCode.trim().toUpperCase(),
    ...puzzle,
  };
}

export function getPuzzle(roomCode: string) {
  const row = db.prepare(
    `SELECT p.question, p.hint, p.answer, p.created_at AS createdAt
     FROM puzzles p
     JOIN rooms r ON p.room_id = r.id
     WHERE r.code = ?
     ORDER BY p.created_at DESC
     LIMIT 1`
  ).get(roomCode.trim().toUpperCase());

  if (!row) {
    return null;
  }

  return {
    roomCode: roomCode.trim().toUpperCase(),
    question: row.question,
    hint: row.hint,
    answer: row.answer,
    createdAt: row.createdAt,
  } as StoredPuzzle;
}

export function clearPuzzle(roomCode: string) {
  const room = db.prepare('SELECT id FROM rooms WHERE code = ?').get(roomCode.trim().toUpperCase());
  if (!room) {
    return;
  }

  db.prepare('DELETE FROM puzzles WHERE room_id = ?').run(room.id);
}
