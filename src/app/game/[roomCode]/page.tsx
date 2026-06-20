'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import PuzzleCard from '@/components/PuzzleCard';
import ScoreCard from '@/components/ScoreCard';
import Timer from '@/components/Timer';

interface GamePageProps {
  params: {
    roomCode: string;
  };
}

interface PuzzleData {
  question: string;
  hint: string;
  answer: string;
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();

  const [puzzles, setPuzzles] = useState<PuzzleData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const [showHint, setShowHint] = useState(false);

  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPuzzles() {
      try {
        setLoading(true);

        const response = await fetch('/api/generate-puzzle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomCode: params.roomCode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage('Unable to load challenges');
          return;
        }

        setPuzzles(data.puzzles);
      } catch (error) {
        console.error(error);
        setMessage('Unable to load challenges');
      } finally {
        setLoading(false);
      }
    }

    loadPuzzles();
  }, [params.roomCode]);

  const puzzle = puzzles[currentQuestion];

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!puzzle) return;

    const correct =
      puzzle.answer.trim().toLowerCase() ===
      answer.trim().toLowerCase();

    if (!correct) {
      setMessage('❌ Incorrect answer');
      setScore((prev) => prev - 10);
      return;
    }

    setScore((prev) => prev + 100);

    if (currentQuestion === 4) {
      router.push('/victory');
      return;
    }

    setCurrentQuestion((prev) => prev + 1);

    setAnswer('');
    setMessage('✅ Correct! Next challenge.');

    setShowHint(false);
  }

  function handleHint() {
    setShowHint(true);
    setScore((prev) => prev - 20);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              🛡 CyberQuest AI
            </h1>

            <p className="text-slate-400 mt-2">
              Cyber Incident Response Simulator
            </p>

            <p className="text-cyan-400 mt-2">
              Room Code: {params.roomCode}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="border border-slate-700 rounded-xl px-4 py-3"
          >
            Leave Room
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-cyan-700 bg-cyan-950 p-4">
              <h2 className="font-semibold text-cyan-300">
                Mission Progress
              </h2>

              <p className="mt-2">
                Question {currentQuestion + 1} / 5
              </p>
            </div>

            {loading || !puzzle ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
                Loading challenges...
              </div>
            ) : (
              <PuzzleCard
                question={puzzle.question}
                answer={answer}
                onAnswerChange={setAnswer}
                onSubmit={handleSubmit}
                feedback={message}
              />
            )}

            {showHint && puzzle ? (
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-yellow-300">
                  Hint: {puzzle.hint}
                </p>
              </div>
            ) : null}

            <button
              onClick={handleHint}
              className="w-full rounded-2xl bg-slate-800 px-4 py-3"
            >
              Get Hint
            </button>
          </section>

          <aside className="space-y-6">
            <Timer initialSeconds={900} />

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold mb-4">
                Mission Score
              </h3>

              <div className="text-4xl font-bold text-cyan-400">
                {score}
              </div>
            </div>

            <ScoreCard />
          </aside>
        </div>
      </div>
    </main>
  );
}