'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinRoomForm() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    setError('');
    setLoading(true);

    const response = await fetch('/api/join-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode: roomCode.trim().toUpperCase() }),
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? 'Could not join room');
      return;
    }

    const data = await response.json();
    router.push(`/game/${data.roomCode}`);
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold mb-3">Join Room</h2>
      <p className="text-slate-400 mb-6">Enter a room code to join an active game session.</p>
      <label className="block mb-4">
        <span className="text-slate-300">Room code</span>
        <input
          type="text"
          value={roomCode}
          onChange={(event) => setRoomCode(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100"
          placeholder="ABC123"
          maxLength={6}
        />
      </label>
      {error ? <p className="mb-4 text-sm text-rose-400">{error}</p> : null}
      <button
        type="button"
        onClick={handleJoin}
        disabled={loading}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-slate-100 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Joining...' : 'Join Room'}
      </button>
    </div>
  );
}
