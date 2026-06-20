import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function VictoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="mb-8 text-7xl">
          🛡️
        </div>

        <h1 className="mb-6 text-5xl font-bold text-cyan-400">
          Incident Resolved
        </h1>

        <p className="mb-10 text-lg text-slate-300">
          Your team successfully completed the cyber incident response mission.
        </p>

        <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-2xl font-semibold">
            Mission Report
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                Final Score
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                100
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                Threat Level
              </p>

              <p className="mt-2 text-3xl font-bold text-yellow-400">
                Neutralized
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                Mission Status
              </p>

              <p className="mt-2 text-3xl font-bold text-cyan-400">
                Success
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Start New Mission
        </Link>
      </section>
    </main>
  );
}
