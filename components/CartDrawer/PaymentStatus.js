const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: '36px 28px 28px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  },
  iconCircle: (success) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: success ? '#e6f9ee' : '#fdecea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '2.2rem',
  }),
  heading: (success) => ({
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: '1.25rem',
    color: success ? '#1a7f3c' : '#c0392b',
    marginBottom: 8,
  }),
  sub: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    color: '#6B4C3B',
    marginBottom: 20,
    lineHeight: 1.6,
  },
  infoBox: {
    backgroundColor: '#FAF5ED',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 24,
    textAlign: 'left',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoKey: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 700,
    color: '#9B7B6A',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  infoVal: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#1C0C00',
    maxWidth: 180,
    wordBreak: 'break-all',
    textAlign: 'right',
  },
  btn: (success) => ({
    width: '100%',
    backgroundColor: success ? '#8B1A3B' : '#8B1A3B',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '13px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  }),
  retryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#8B1A3B',
    border: '1.5px solid #8B1A3B',
    borderRadius: 8,
    padding: '12px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: 10,
  },
};

const PaymentStatus = ({ success, data, onClose, onRetry }) => {
  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.iconCircle(success)}>
          {success ? '✅' : '❌'}
        </div>

        <div style={s.heading(success)}>
          {success ? 'Payment Successful!' : 'Payment Failed'}
        </div>

        <p style={s.sub}>
          {success
            ? `Thank you, ${data.name}! Your order has been placed. We will deliver to ${data.city} shortly.`
            : `${data.reason || 'Your payment could not be processed.'} Please try again.`}
        </p>

        {success && (
          <div style={s.infoBox}>
            {data.orderId && (
              <div style={s.infoRow}>
                <span style={s.infoKey}>Order ID</span>
                <span style={s.infoVal}>{data.orderId}</span>
              </div>
            )}
            {data.paymentId && (
              <div style={s.infoRow}>
                <span style={s.infoKey}>Payment ID</span>
                <span style={s.infoVal}>{data.paymentId}</span>
              </div>
            )}
            {data.amount && (
              <div style={s.infoRow}>
                <span style={s.infoKey}>Amount Paid</span>
                <span style={s.infoVal}>
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(data.amount / 100)}
                </span>
              </div>
            )}
          </div>
        )}

        <button style={s.btn(success)} onClick={onClose}>
          {success ? 'Continue Shopping' : 'Close'}
        </button>

        {!success && onRetry && (
          <button style={s.retryBtn} onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
