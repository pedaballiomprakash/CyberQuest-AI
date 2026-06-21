import { supabase } from './supabase';
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

export async function getRoomByCode(
  roomCode: string
): Promise<RoomRecord | null> {
  const { data } = await supabase
    .from('rooms')
    .select('*')
    .eq('code', roomCode.trim().toUpperCase())
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    code: data.code,
    hostId: data.host_id,
    createdAt: data.created_at,
  };
}

export async function createRoom(
  hostUserId?: string,
  hostEmail?: string
): Promise<RoomRecord> {
  let userId = hostUserId;

  if (!userId) {
    const email = hostEmail
      ? normalizeEmail(hostEmail)
      : `guest+${Math.random().toString(36).slice(2, 8)}@cyberquest.ai`;

    let user = await getUserByEmail(email);

    if (!user) {
      const password = Math.random()
        .toString(36)
        .slice(2, 12);

      user = await createUser('Guest', email, password);
    }

    userId = user.id;
  }

  let code = generateRoomCode();

  while (true) {
    const { data } = await supabase
      .from('rooms')
      .select('id')
      .eq('code', code)
      .maybeSingle();

    if (!data) {
      break;
    }

    code = generateRoomCode();
  }

  const { data, error } = await supabase
    .from('rooms')
    .insert({
      code,
      host_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    code: data.code,
    hostId: data.host_id,
    createdAt: data.created_at,
  };
}