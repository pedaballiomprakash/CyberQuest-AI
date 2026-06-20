'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  initialSeconds: number;
}

export default function Timer({
  initialSeconds,
}: TimerProps) {
  const [timeLeft, setTimeLeft] =
    useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.24em] text-slate-500">
        Mission Timer
      </p>

      <div className="text-5xl font-bold text-cyan-300">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Solve the incident before time expires.
      </p>
    </div>
  );
}