import crypto from 'crypto';

function makeToken(username) {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(username)
    .digest('hex');
}

export function isAdminAuthenticated(req) {
  const token = req.cookies?.blj_admin;
  if (!token) return false;
  const expected = makeToken(process.env.ADMIN_USERNAME);
  return token === expected;
}

export function requireAdmin(ctx) {
  if (!isAdminAuthenticated(ctx.req)) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
  return null;
}
