import crypto from 'crypto';

function makeToken(username) {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(username)
    .digest('hex');
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = makeToken(username);
  const isProduction = process.env.NODE_ENV === 'production';

  res.setHeader(
    'Set-Cookie',
    `blj_admin=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400${isProduction ? '; Secure' : ''}`
  );
  res.status(200).json({ ok: true });
}
