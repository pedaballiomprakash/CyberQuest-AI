import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export interface User {
id: string;
email: string;
name?: string;
createdAt: string;
}

export async function getUserByEmail(
email: string
): Promise<User | null> {
const { data } = await supabase
.from('users')
.select('*')
.eq('email', email.toLowerCase())
.single();

if (!data) {
return null;
}

return {
id: data.id,
email: data.email,
name: data.name,
createdAt: data.created_at,
};
}

export async function getUserById(
id: string
): Promise<User | null> {
const { data } = await supabase
.from('users')
.select('*')
.eq('id', id)
.single();

if (!data) {
return null;
}

return {
id: data.id,
email: data.email,
name: data.name,
createdAt: data.created_at,
};
}

export async function createUser(
name: string,
email: string,
password: string
): Promise<User> {
const passwordHash = bcrypt.hashSync(password, 10);

const { data, error } = await supabase
.from('users')
.insert({
email: email.toLowerCase(),
name,
password_hash: passwordHash,
})
.select()
.single();

if (error) {
throw error;
}

return {
id: data.id,
email: data.email,
name: data.name,
createdAt: data.created_at,
};
}

export async function loginUser(
email: string,
password: string
) {
const { data } = await supabase
.from('users')
.select('*')
.eq('email', email.toLowerCase())
.single();

if (!data) {
return {
success: false,
error: 'Invalid credentials',
};
}

const validPassword = bcrypt.compareSync(
password,
data.password_hash
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
id: data.id,
email: data.email,
name: data.name,
createdAt: data.created_at,
},
};
}

export async function signUpUser(
name: string,
email: string,
password: string
) {
const existing = await getUserByEmail(
email.toLowerCase()
);

if (existing) {
return {
success: false,
error: 'Email already registered',
};
}

const user = await createUser(
name,
email,
password
);

return {
success: true,
user,
};
}
