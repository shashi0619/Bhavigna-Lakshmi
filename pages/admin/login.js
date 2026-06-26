import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.replace('/admin/orders');
    } else {
      const data = await res.json();
      setError(data.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — Bhavigna Lakshmi Jewellery</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#FAF5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Raleway', sans-serif" }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 380, padding: '40px 32px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>

          {/* Logo / Brand */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>💎</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1C0C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bhavigna Lakshmi
            </div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B7B6A', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
              Admin Portal
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
                style={inp(false)}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20, position: 'relative' }}>
              <label style={lbl}>Password</label>
              <input
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                style={{ ...inp(false), paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                style={{ position: 'absolute', right: 12, bottom: 11, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#9B7B6A', padding: 0 }}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ backgroundColor: '#fdecea', color: '#c0392b', fontSize: '0.78rem', fontWeight: 600, borderRadius: 6, padding: '9px 12px', marginBottom: 16, textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', backgroundColor: loading ? '#c9a0ae' : '#8B1A3B', color: '#fff', border: 'none', borderRadius: 8, padding: '13px', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const lbl = {
  display: 'block',
  fontSize: '0.68rem',
  fontWeight: 700,
  color: '#6B4C3B',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: 6,
};

const inp = () => ({
  width: '100%',
  border: '1.5px solid #e0d8cc',
  borderRadius: 7,
  padding: '11px 13px',
  fontFamily: "'Raleway', sans-serif",
  fontSize: '0.88rem',
  color: '#1C0C00',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
});
