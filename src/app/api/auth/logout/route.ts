import { NextResponse } from 'next/server';
import { deleteSession, getSessionIdFromRequest } from '@/lib/session';

export async function POST(req: Request) {
  const sessionId = getSessionIdFromRequest(req);

  if (sessionId) {
    deleteSession(sessionId);
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set('sessionId', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}