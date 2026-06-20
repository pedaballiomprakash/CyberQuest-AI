import db from './db';
import { getUserByEmail, createUser } from './auth';
import { generateRoomCode } from './utils';

export interface RoomRecord {
  id: string;
  code: string;
  hostId: string;
  createdAt: string;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getRoomByCode(
  roomCode: string
): RoomRecord | null {
  const row: any = db
    .prepare(
      'SELECT id, code, host_id as hostId, created_at as createdAt FROM rooms WHERE code = ?'
    )
    .get(roomCode.trim().toUpperCase());

  return row ?? null;
}

export function createRoom(
  hostUserId?: string,
  hostEmail?: string
): RoomRecord {
  let userId = hostUserId;

  if (!userId) {
    const email = hostEmail
      ? normalizeEmail(hostEmail)
      : `guest+${Math.random()
          .toString(36)
          .slice(2, 8)}@cyberquest.ai`;

    let user = getUserByEmail(email);

    if (!user) {
      const password = Math.random()
        .toString(36)
        .slice(2, 12);

      user = createUser(
        'Guest',
        email,
        password
      );
    }

    userId = user.id;
  }

  let code = generateRoomCode();

  while (
    (db
      .prepare(
        'SELECT id FROM rooms WHERE code = ?'
      )
      .get(code) as any)
  ) {
    code = generateRoomCode();
  }

  const id = `room_${Math.random()
    .toString(36)
    .slice(2, 12)}`;

  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO rooms (id, code, host_id, created_at) VALUES (?, ?, ?, ?)'
  ).run(
    id,
    code,
    userId,
    createdAt
  );

  return {
    id,
    code,
    hostId: userId,
    createdAt,
  };
}