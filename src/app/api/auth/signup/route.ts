import { NextResponse } from 'next/server';
import { signUpUser } from '@/lib/auth';
import { createSession } from '@/lib/session';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const result = await signUpUser(name, email, password);
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error ?? 'Unable to create account' }, { status: 400 });
  }

  const session = createSession(result.user.id);
  const response = NextResponse.json({ success: true, user: result.user });
  response.cookies.set('sessionId', session.sessionId, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
