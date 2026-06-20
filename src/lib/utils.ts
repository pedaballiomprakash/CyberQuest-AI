export function generateRoomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function clampScore(score: number) {
  return Math.max(0, score);
}
