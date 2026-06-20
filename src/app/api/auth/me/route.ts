import { NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/session';
import { getUserById } from '@/lib/auth';

export async function GET(req: Request) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ success: false, user: null });
  }

  const user = getUserById(userId);
  return NextResponse.json({ success: true, user });
}
