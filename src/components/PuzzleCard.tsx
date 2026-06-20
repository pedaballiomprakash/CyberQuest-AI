'use client';

import type { FormEvent } from 'react';

interface PuzzleCardProps {
  question: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  feedback?: string;
}

export default function PuzzleCard({ question, answer, onAnswerChange, onSubmit, feedback }: PuzzleCardProps) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-slate-950/20">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">AI Puzzle</span>
        <span className="text-sm text-slate-400">Difficulty: Dynamic</span>
      </div>
      <h2 className="text-3xl font-semibold mb-4">{question}</h2>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          placeholder="Enter your answer"
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100"
        />
        {feedback ? <p className="text-sm text-rose-400">{feedback}</p> : null}
        <button type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
          Submit Answer
        </button>
      </form>
    </article>
  );
}
