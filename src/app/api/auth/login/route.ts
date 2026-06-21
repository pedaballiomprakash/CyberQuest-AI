import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import { createSession } from '@/lib/session';

export async function POST(req: Request) {
const { email, password } = await req.json();

const result = await loginUser(
email,
password
);

if (!result.success) {
return NextResponse.json(
{
success: false,
error: 'Invalid credentials',
},
{ status: 401 }
);
}

const session = await createSession(
result.user!.id
);

const response = NextResponse.json({
success: true,
user: result.user,
});

response.cookies.set(
'sessionId',
session.sessionId,
{
httpOnly: true,
path: '/',
sameSite: 'lax',
maxAge: 60 * 60 * 24 * 7,
}
);

return response;
}
