import { useState } from 'react';

const s = {
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
    padding: '4px 8px',
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
  fieldWrap: { marginBottom: 14 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
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
    border: '1.5px solid #e0d8cc',
    borderRadius: 6,
    padding: '10px 12px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    color: '#1C0C00',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#c0392b',
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
  },
};

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const formatINR = (amt) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);

const AddressForm = ({ onSubmit, onClose, total }) => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address1: '', address2: '',
    city: '', state: 'Telangana', pincode: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

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

  const inputStyle = (field) => ({
    ...s.input,
    ...(errors[field] ? s.inputError : {}),
  });

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.header}>
          <span style={s.title}>Delivery Address</span>
          <button type="button" style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={s.totalRow}>
          <span style={s.totalLabel}>Order Total</span>
          <span style={s.totalAmount}>{formatINR(total)}</span>
        </div>

        <form onSubmit={handleSubmit}>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="name">Full Name *</label>
            <input
              style={inputStyle('name')}
              id="name" name="name" type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="phone">Mobile Number *</label>
            <input
              style={inputStyle('phone')}
              id="phone" name="phone" type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              autoComplete="tel"
            />
          </div>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="email">Email (optional)</label>
            <input
              style={inputStyle('email')}
              id="email" name="email" type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="address1">Address Line 1 *</label>
            <input
              style={inputStyle('address1')}
              id="address1" name="address1" type="text"
              placeholder="House / Flat / Street"
              value={form.address1}
              onChange={handleChange}
              autoComplete="address-line1"
            />
          </div>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="address2">Address Line 2</label>
            <input
              style={inputStyle('address2')}
              id="address2" name="address2" type="text"
              placeholder="Landmark, Area (optional)"
              value={form.address2}
              onChange={handleChange}
              autoComplete="address-line2"
            />
          </div>

          <div style={s.row}>
            <div style={s.fieldWrap}>
              <label style={s.label} htmlFor="city">City *</label>
              <input
                style={inputStyle('city')}
                id="city" name="city" type="text"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
            </div>
            <div style={s.fieldWrap}>
              <label style={s.label} htmlFor="pincode">Pincode *</label>
              <input
                style={inputStyle('pincode')}
                id="pincode" name="pincode" type="tel"
                placeholder="6-digit pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength={6}
              />
            </div>
          </div>

          <div style={s.fieldWrap}>
            <label style={s.label} htmlFor="state">State *</label>
            <select
              style={inputStyle('state')}
              id="state" name="state"
              value={form.state}
              onChange={handleChange}
            >
              {STATES.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <button type="submit" style={s.submitBtn}>
            Continue to Payment →
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddressForm;
