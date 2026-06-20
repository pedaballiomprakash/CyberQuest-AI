'use client';

interface HintButtonProps {
  onGetHint: () => Promise<void>;
  hint?: string;
  loading: boolean;
}

export default function HintButton({ onGetHint, hint, loading }: HintButtonProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Need a hint?</h3>
        <p className="text-slate-400">Request a clue from the AI to progress through the room.</p>
      </div>
      {hint ? <p className="mb-4 rounded-2xl bg-slate-950 px-4 py-3 text-slate-200">{hint}</p> : null}
      <button
        type="button"
        onClick={onGetHint}
        disabled={loading}
        className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Fetching hint...' : 'Get Hint'}
      </button>
    </div>
  );
}
