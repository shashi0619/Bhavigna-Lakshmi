import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 1400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 440,
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '24px 24px 28px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#1C0C00',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.3rem',
    color: '#6B4C3B',
    cursor: 'pointer',
    lineHeight: 1,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    display: 'block',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 600,
    color: '#6B4C3B',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    border: '1px solid #e0d8cc',
    borderRadius: 6,
    padding: '10px 12px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    color: '#1C0C00',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    '&:focus': { borderColor: '#C9A84C' },
  },
  submitBtn: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#8B1A3B',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '13px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': { backgroundColor: '#6e1430' },
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF5ED',
    borderRadius: 6,
    padding: '10px 14px',
    marginBottom: 18,
  },
  totalLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.75rem',
    color: '#6B4C3B',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  totalAmount: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 800,
    color: '#1C0C00',
  },
};

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const AddressForm = ({ classes, onSubmit, onClose, total }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address1: '', address2: '',
    city: '', state: 'Telangana', pincode: '',
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = true;
    if (!form.address1.trim()) e.address1 = true;
    if (!form.city.trim()) e.city = true;
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const formatINR = (amt) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);

  const inputStyle = (id) => ({
    width: '100%',
    border: `1.5px solid ${errors[id] ? '#c0392b' : '#e0d8cc'}`,
    borderRadius: 6,
    padding: '10px 12px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    color: '#1C0C00',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  });

  const Field = ({ id, label, placeholder, type = 'text', required }) => (
    <div className={classes.fieldWrap}>
      <label className={classes.label} htmlFor={id}>{label}{required && ' *'}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={set(id)}
        style={inputStyle(id)}
        onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
        onBlur={(e) => (e.target.style.borderColor = errors[id] ? '#c0392b' : '#e0d8cc')}
        autoComplete="on"
      />
    </div>
  );

  return (
    <div className={classes.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <span className={classes.title}>Delivery Address</span>
          <button className={classes.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={classes.totalRow}>
          <span className={classes.totalLabel}>Order Total</span>
          <span className={classes.totalAmount}>{formatINR(total)}</span>
        </div>

        <form onSubmit={handleSubmit} autoComplete="on">
          <Field id="name" label="Full Name" placeholder="Your full name" required />
          <Field id="phone" label="Mobile Number" placeholder="10-digit mobile number" type="tel" required />
          <Field id="email" label="Email (optional)" placeholder="your@email.com" type="email" />
          <Field id="address1" label="Address Line 1" placeholder="House / Flat / Street" required />
          <Field id="address2" label="Address Line 2" placeholder="Landmark, Area (optional)" />
          <div className={classes.row}>
            <Field id="city" label="City" placeholder="City" required />
            <Field id="pincode" label="Pincode" placeholder="6-digit pincode" type="tel" required />
          </div>
          <div className={classes.fieldWrap}>
            <label className={classes.label} htmlFor="state">State *</label>
            <select
              id="state"
              value={form.state}
              onChange={set('state')}
              style={inputStyle('state')}
            >
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className={classes.submitBtn}>
            Continue to Payment →
          </button>
        </form>
      </div>
    </div>
  );
};

export default withStyles(styles)(AddressForm);
