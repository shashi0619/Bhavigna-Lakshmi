export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'blj_admin=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0');
  res.redirect(302, '/admin/login');
}
