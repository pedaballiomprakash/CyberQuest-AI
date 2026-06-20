'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-cyan-400"
        >
          🛡 CyberQuest AI
        </Link>

        <div className="flex items-center gap-6 text-slate-300">
          <Link
            href="/dashboard"
            className="hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/victory"
            className="hover:text-white"
          >
            Mission Report
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-700 px-4 py-2 hover:border-red-500 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}