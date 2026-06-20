'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate() {
    setError('');
    setLoading(true);

    const response = await fetch('/api/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? 'Unable to create room');
      return;
    }

    const data = await response.json();
    router.push(`/game/${data.roomCode}`);
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold mb-3">Create Room</h2>
      <p className="text-slate-400 mb-6">Generate a new room code and invite players to start your game.</p>
      {error ? <p className="mb-4 text-sm text-rose-400">{error}</p> : null}
      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Creating room...' : 'Create Room'}
      </button>
    </div>
  );
}
