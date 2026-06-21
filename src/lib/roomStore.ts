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
const { data, error } = await supabase
.from('rooms')
.select('*')
.eq('code', roomCode.trim().toUpperCase())
.maybeSingle();

console.log('getRoomByCode:', {
data,
error,
});

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
console.log('START createRoom');
console.log(
'hostUserId:',
hostUserId
);
console.log(
'generateRoomCode type:',
typeof generateRoomCode
);

let userId = hostUserId;

if (!userId) {
const email = hostEmail
? normalizeEmail(hostEmail)
: `guest+${Math.random()
          .toString(36)
          .slice(2, 8)}@cyberquest.ai`;

```
console.log(
  'guest email:',
  email
);

let user =
  await getUserByEmail(email);

if (!user) {
  const password = Math.random()
    .toString(36)
    .slice(2, 12);

  user = await createUser(
    'Guest',
    email,
    password
  );
}

userId = user.id;
```

}

console.log(
'calling generateRoomCode'
);

let code = generateRoomCode();

console.log(
'generated code:',
code
);

while (true) {
const result =
await supabase
.from('rooms')
.select('id')
.eq('code', code)
.maybeSingle();

```
console.log(
  'room lookup:',
  result
);

if (!result.data) {
  break;
}

code = generateRoomCode();
```

}

console.log(
'inserting room...'
);

const { data, error } =
await supabase
.from('rooms')
.insert({
code,
host_id: userId,
})
.select()
.single();

console.log(
'insert result:',
{
data,
error,
}
);

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
