const base = 'http://localhost:3001';
const email = `test+${Date.now()}@example.com`;

async function run() {
  console.log('Testing with email', email);

  const loginPage = await fetch(`${base}/login`);
  console.log('/login status', loginPage.status);

  const signup = await fetch(`${base}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: 'Test1234' }),
    redirect: 'manual',
  });

  console.log('/api/auth/signup status', signup.status);
  const cookie = signup.headers.get('set-cookie');
  console.log('set-cookie header', cookie ? 'present' : 'missing');
  if (!cookie) {
    console.error('Error: signup did not return session cookie');
    process.exit(1);
  }

  const me = await fetch(`${base}/api/auth/me`, {
    headers: {
      cookie,
    },
  });
  console.log('/api/auth/me status', me.status);
  console.log('me body', await me.text());

  const dashboard = await fetch(`${base}/dashboard`, {
    headers: {
      cookie,
    },
    redirect: 'manual',
  });
  console.log('/dashboard status', dashboard.status);
  console.log('dashboard location', dashboard.headers.get('location'));
  const html = await dashboard.text();
  console.log('dashboard body preview:', html.slice(0, 200).replace(/\n/g, ' '));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
