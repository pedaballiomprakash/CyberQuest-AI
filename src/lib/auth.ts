import bcrypt from 'bcryptjs';
import db from './db';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export function getUserByEmail(email: string): User | null {
  const normalizedEmail = email.trim().toLowerCase();

  const row: any = db
    .prepare(
      'SELECT id, email, name, created_at as createdAt FROM users WHERE email = ?'
    )
    .get(normalizedEmail);

  return row ?? null;
}

export function getUserById(id: string): User | null {
  const row: any = db
    .prepare(
      'SELECT id, email, name, created_at as createdAt FROM users WHERE id = ?'
    )
    .get(id);

  return row ?? null;
}

export function createUser(
  name: string,
  email: string,
  password: string
): User {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = bcrypt.hashSync(password, 10);

  const id = `user_${Math.random()
    .toString(36)
    .slice(2, 12)}`;

  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(
    id,
    normalizedEmail,
    name,
    passwordHash,
    createdAt
  );

  return {
    id,
    email: normalizedEmail,
    name,
    createdAt,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const normalizedEmail = email.trim().toLowerCase();

  const result: any = db
    .prepare(
      'SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?'
    )
    .get(normalizedEmail);

  if (!result) {
    return {
      success: false,
      error: 'Invalid credentials',
    };
  }

  const validPassword = bcrypt.compareSync(
    password,
    result.password_hash
  );

  if (!validPassword) {
    return {
      success: false,
      error: 'Invalid credentials',
    };
  }

  return {
    success: true,
    user: {
      id: result.id,
      email: result.email,
      name: result.name,
      createdAt: result.created_at,
    } as User,
  };
}

export async function signUpUser(
  name: string,
  email: string,
  password: string
) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing: any = db
    .prepare(
      'SELECT id FROM users WHERE email = ?'
    )
    .get(normalizedEmail);

  if (existing) {
    return {
      success: false,
      error: 'Email already registered',
    };
  }

  const user = createUser(
    name,
    normalizedEmail,
    password
  );

  return {
    success: true,
    user,
  };
}