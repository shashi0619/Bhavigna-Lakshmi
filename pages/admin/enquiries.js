import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { requireAdmin } from '../../lib/adminAuth';

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

export default function AdminEnquiries() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => { setMessages(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      !q ||
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.phone?.includes(q) ||
      m.message?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Head>
        <title>Enquiries — Bhavigna Lakshmi Jewellery</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Raleway', sans-serif", minHeight: '100vh', backgroundColor: '#FAF5ED', padding: '24px 16px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#1C0C00', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Enquiries
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9B7B6A' }}>
                Bhavigna Lakshmi Jewellery · Admin
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => router.push('/admin/orders')}
                style={{ backgroundColor: 'transparent', color: '#1C0C00', border: '1.5px solid #1C0C00', borderRadius: 6, padding: '9px 18px', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Orders
              </button>
              <button onClick={load} style={{ backgroundColor: '#8B1A3B', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 18px', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Refresh
              </button>
              <button
                onClick={() => router.push('/api/admin-logout')}
                style={{ backgroundColor: 'transparent', color: '#8B1A3B', border: '1.5px solid #8B1A3B', borderRadius: 6, padding: '9px 18px', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Total Enquiries', value: messages.length, color: '#1C0C00' },
              { label: 'Last 7 Days', value: messages.filter((m) => Date.now() - new Date(m.createdAt).getTime() < 7 * 86400000).length, color: '#8B1A3B' },
            ].map((stat) => (
              <div key={stat.label} style={{ backgroundColor: '#fff', borderRadius: 10, padding: '14px 16px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B7B6A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <input
            placeholder="Search by name, email, phone, message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', border: '1.5px solid #e0d8cc', borderRadius: 8, padding: '10px 14px', fontFamily: 'inherit', fontSize: '0.85rem', color: '#1C0C00', outline: 'none', marginBottom: 16, boxSizing: 'border-box', backgroundColor: '#fff' }}
          />

          {/* Messages */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9B7B6A' }}>Loading enquiries…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9B7B6A' }}>No enquiries found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered
                .slice()
                .reverse()
                .map((m, i) => (
                  <div key={m.id || i} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1C0C00' }}>{m.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#6B4C3B' }}>✉️ {m.email}{m.phone ? ` · 📞 ${m.phone}` : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {m.interest && (
                          <span style={{ display: 'inline-block', backgroundColor: '#FDF3E7', color: '#8B1A3B', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: 20, padding: '3px 10px', marginBottom: 6 }}>
                            {m.interest}
                          </span>
                        )}
                        <div style={{ fontSize: '0.72rem', color: '#9B7B6A' }}>{formatDate(m.createdAt)}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#1C0C00', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.message}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const redirect = requireAdmin(ctx);
  if (redirect) return redirect;
  return { props: {} };
}
