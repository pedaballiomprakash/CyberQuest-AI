import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateRoomForm from '@/components/CreateRoomForm';
import JoinRoomForm from '@/components/JoinRoomForm';
import Navbar from '@/components/Navbar';
import { getUserById } from '@/lib/auth';
import { getUserIdFromCookieValue } from '@/lib/session';

export default async function DashboardPage() {
const sessionId =
cookies().get('sessionId')?.value ?? null;

const userId =
await getUserIdFromCookieValue(
sessionId
);

const user = userId
? await getUserById(userId)
: null;

if (!user) {
  redirect('/login');
}

return (
  <main className="min-h-screen bg-slate-950 text-slate-100">
    <Navbar />

    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-4">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Welcome {user.name ?? user.email}, create a new room or join an existing puzzle challenge.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <CreateRoomForm />
        <JoinRoomForm />
      </div>
    </section>
  </main>
);
}
