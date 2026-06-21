import { supabase } from './supabase';

export interface SessionRecord {
sessionId: string;
userId: string;
createdAt: string;
}

export async function createSession(
userId: string
): Promise<SessionRecord> {
const sessionId = `sess_${Math.random()
    .toString(36)
    .slice(2, 18)}`;

const createdAt = new Date().toISOString();

const { error } = await supabase
.from('sessions')
.insert({
session_id: sessionId,
user_id: userId,
created_at: createdAt,
});

if (error) {
throw error;
}

return {
sessionId,
userId,
createdAt,
};
}

export async function getSession(
sessionId: string
): Promise<SessionRecord | null> {
const { data } = await supabase
.from('sessions')
.select('*')
.eq('session_id', sessionId)
.single();

if (!data) {
return null;
}

return {
sessionId: data.session_id,
userId: data.user_id,
createdAt: data.created_at,
};
}

export async function deleteSession(
sessionId: string
) {
await supabase
.from('sessions')
.delete()
.eq('session_id', sessionId);
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

export async function getUserIdFromRequest(
req: Request
): Promise<string | null> {
const sessionId =
getSessionIdFromRequest(req);

if (!sessionId) {
return null;
}

const session =
await getSession(sessionId);

return session?.userId ?? null;
}

export async function getUserIdFromCookieValue(
sessionId: string | null
): Promise<string | null> {
if (!sessionId) {
return null;
}

const session =
await getSession(sessionId);

return session?.userId ?? null;
}
