import db from './db';

export interface SessionRecord {
  sessionId: string;
  userId: string;
  createdAt: string;
}

export function createSession(
  userId: string
): SessionRecord {
  const sessionId = `sess_${Math.random()
    .toString(36)
    .slice(2, 18)}`;

  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO sessions (session_id, user_id, created_at) VALUES (?, ?, ?)'
  ).run(
    sessionId,
    userId,
    createdAt
  );

  return {
    sessionId,
    userId,
    createdAt,
  };
}

export function getSession(
  sessionId: string
): SessionRecord | null {
  const row: any = db
    .prepare(
      'SELECT session_id as sessionId, user_id as userId, created_at as createdAt FROM sessions WHERE session_id = ?'
    )
    .get(sessionId);

  return row ?? null;
}

export function deleteSession(
  sessionId: string
) {
  db.prepare(
    'DELETE FROM sessions WHERE session_id = ?'
  ).run(sessionId);
}

export function getSessionIdFromCookieHeader(
  cookieHeader: string | null
): string | null {
  const header = cookieHeader ?? '';

  const match = header.match(
    /(?:^|; )sessionId=([^;]+)/
  );

  return match?.[1] ?? null;
}

export function getSessionIdFromRequest(
  req: Request
): string | null {
  return getSessionIdFromCookieHeader(
    req.headers.get('cookie')
  );
}

export function getUserIdFromRequest(
  req: Request
): string | null {
  const sessionId =
    getSessionIdFromRequest(req);

  if (!sessionId) {
    return null;
  }

  const session = getSession(sessionId);

  return session?.userId ?? null;
}

export function getUserIdFromCookieValue(
  sessionId: string | null
): string | null {
  if (!sessionId) {
    return null;
  }

  const session = getSession(sessionId);

  return session?.userId ?? null;
}