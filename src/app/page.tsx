import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-semibold mb-4">Cyberquest AI</h1>
        <p className="text-slate-300 mb-8">Join a live puzzle room, solve AI-generated challenges, and race to victory.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login" className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-900 hover:bg-cyan-400">Login</Link>
          <Link href="/signup" className="rounded-xl border border-slate-700 px-5 py-3 hover:border-slate-500">Sign Up</Link>
          <Link href="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 hover:border-slate-500">Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
