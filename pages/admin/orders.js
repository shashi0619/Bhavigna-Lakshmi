import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { requireAdmin } from '../../lib/adminAuth';

const formatINR = (paise) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(paise / 100);

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

const statusColor = { paid: '#1a7f3c', pending: '#b7791f', failed: '#c0392b' };
const statusBg   = { paid: '#e6f9ee', pending: '#fef3c7', failed: '#fdecea' };

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      !q ||
      o.address?.name?.toLowerCase().includes(q) ||
      o.address?.phone?.includes(q) ||
      o.address?.city?.toLowerCase().includes(q) ||
      o.orderId?.toLowerCase().includes(q) ||
      o.payment?.paymentId?.toLowerCase().includes(q)
    );
  });

  const paidTotal = orders
    .filter((o) => o.status === 'paid')
    .reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <>
      <Head>
        <title>Orders — Bhavigna Lakshmi Jewellery</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Raleway', sans-serif", minHeight: '100vh', backgroundColor: '#FAF5ED', padding: '24px 16px' }}>
        {/* Header */}
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#1C0C00', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Orders
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9B7B6A' }}>
                Bhavigna Lakshmi Jewellery · Admin
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
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
              { label: 'Total Orders', value: orders.length, color: '#1C0C00' },
              { label: 'Paid', value: orders.filter((o) => o.status === 'paid').length, color: '#1a7f3c' },
              { label: 'Pending', value: orders.filter((o) => o.status === 'pending').length, color: '#b7791f' },
              { label: 'Revenue', value: formatINR(paidTotal), color: '#8B1A3B' },
            ].map((stat) => (
              <div key={stat.label} style={{ backgroundColor: '#fff', borderRadius: 10, padding: '14px 16px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B7B6A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <input
            placeholder="Search by name, phone, city, order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', border: '1.5px solid #e0d8cc', borderRadius: 8, padding: '10px 14px', fontFamily: 'inherit', fontSize: '0.85rem', color: '#1C0C00', outline: 'none', marginBottom: 16, boxSizing: 'border-box', backgroundColor: '#fff' }}
          />

          {/* Orders */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9B7B6A' }}>Loading orders…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9B7B6A' }}>No orders found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map((order, i) => (
                <div key={order.orderId || i} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                    <div>
                      <span style={{ display: 'inline-block', backgroundColor: statusBg[order.status] || '#f5f5f5', color: statusColor[order.status] || '#333', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 20, padding: '3px 10px', marginBottom: 6 }}>
                        {order.status}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: '#9B7B6A' }}>{formatDate(order.payment?.paidAt || order.createdAt)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1C0C00' }}>{formatINR(order.amount)}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {/* Customer */}
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B7B6A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Customer</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1C0C00', marginBottom: 2 }}>{order.address?.name || '—'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6B4C3B' }}>📞 {order.address?.phone || '—'}</div>
                      {order.address?.email && <div style={{ fontSize: '0.8rem', color: '#6B4C3B' }}>✉️ {order.address.email}</div>}
                    </div>

                    {/* Address */}
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B7B6A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Delivery Address</div>
                      <div style={{ fontSize: '0.8rem', color: '#1C0C00', lineHeight: 1.7 }}>
                        {order.address?.address1 && <div>{order.address.address1}</div>}
                        {order.address?.address2 && <div>{order.address.address2}</div>}
                        {order.address?.city && <div>{order.address.city}, {order.address.state}</div>}
                        {order.address?.pincode && <div>📍 {order.address.pincode}</div>}
                      </div>
                    </div>

                    {/* Payment IDs */}
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B7B6A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Payment Info</div>
                      <div style={{ fontSize: '0.72rem', color: '#6B4C3B', lineHeight: 1.8 }}>
                        <div><b>Order:</b> {order.orderId || '—'}</div>
                        <div><b>Payment:</b> {order.payment?.paymentId || '—'}</div>
                        <div><b>Placed:</b> {formatDate(order.createdAt)}</div>
                        {order.payment?.paidAt && <div><b>Paid:</b> {formatDate(order.payment.paidAt)}</div>}
                      </div>
                    </div>
                  </div>
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
