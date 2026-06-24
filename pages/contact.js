import { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';

const styles = (theme) => ({
  pageHero: {
    background: 'linear-gradient(135deg, #0D0408 0%, #2C0A1E 60%, #5C0F27 100%)',
    padding: '96px 24px 72px',
    textAlign: 'center',
  },
  heroLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 14,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    marginBottom: 16,
  },
  goldBar: {
    width: 48,
    height: 2,
    backgroundColor: '#C9A84C',
    margin: '0 auto 20px',
  },
  heroSub: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: 'rgba(253,248,240,0.65)',
    lineHeight: 1.7,
  },

  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '80px 24px 112px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 64,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '2fr 1.2fr',
      padding: '96px 48px 120px',
    },
  },

  // ── Form ──────────────────────────────────────────────────────
  formWrap: {},
  formLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 10,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    fontWeight: 400,
    color: '#1C0C00',
    marginBottom: 32,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  fieldLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#6B4C3B',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid rgba(139,26,59,0.2)',
    borderBottom: '2px solid rgba(139,26,59,0.3)',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: '#1C0C00',
    backgroundColor: '#FDF8F0',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.2s',
    '&:focus': { borderColor: '#8B1A3B', borderBottomColor: '#8B1A3B' },
    '&::placeholder': { color: '#C4A898' },
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid rgba(139,26,59,0.2)',
    borderBottom: '2px solid rgba(139,26,59,0.3)',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: '#1C0C00',
    backgroundColor: '#FDF8F0',
    outline: 'none',
    resize: 'vertical',
    minHeight: 140,
    borderRadius: 0,
    transition: 'border-color 0.2s',
    '&:focus': { borderColor: '#8B1A3B', borderBottomColor: '#8B1A3B' },
    '&::placeholder': { color: '#C4A898' },
  },
  selectWrap: { position: 'relative' },
  select: {
    appearance: 'none',
    width: '100%',
    padding: '12px 16px',
    border: '1px solid rgba(139,26,59,0.2)',
    borderBottom: '2px solid rgba(139,26,59,0.3)',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: '#1C0C00',
    backgroundColor: '#FDF8F0',
    outline: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    '&:focus': { borderBottomColor: '#8B1A3B' },
  },
  submitBtn: {
    backgroundColor: '#8B1A3B',
    color: '#FDF8F0',
    border: 'none',
    padding: '16px 40px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.3s',
    alignSelf: 'flex-start',
    '&:hover': { backgroundColor: '#5C0F27' },
    '&:disabled': { backgroundColor: '#9B7B6A', cursor: 'not-allowed' },
  },
  successMsg: {
    padding: '20px 24px',
    backgroundColor: '#E8F5E9',
    borderLeft: '4px solid #2E7D32',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: '#1B5E20',
    lineHeight: 1.7,
  },

  // ── Sidebar ───────────────────────────────────────────────────
  sidebar: {},
  infoCard: {
    backgroundColor: '#1C0C00',
    padding: '40px 32px',
    marginBottom: 24,
  },
  infoCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    fontWeight: 400,
    color: '#FDF8F0',
    marginBottom: 24,
  },
  infoItem: {
    display: 'flex',
    gap: 14,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoIcon: { fontSize: '1rem', marginTop: 2, flexShrink: 0 },
  infoItemTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.7rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: 4,
  },
  infoItemText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    color: 'rgba(253,248,240,0.7)',
    lineHeight: 1.6,
  },
  hoursCard: {
    border: '1px solid rgba(201,168,76,0.25)',
    padding: '32px',
  },
  hoursTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.2rem',
    color: '#1C0C00',
    marginBottom: 20,
  },
  hoursRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.8rem',
  },
  hoursDay: { color: '#6B4C3B', fontWeight: 500 },
  hoursTime: { color: '#8B1A3B', fontWeight: 600 },
});

const HOURS = [
  { day: 'Monday – Friday', time: '10:00 am – 7:00 pm' },
  { day: 'Saturday', time: '10:00 am – 8:00 pm' },
  { day: 'Sunday', time: '11:00 am – 6:00 pm' },
];

const Contact = ({ pathname, collections, classes }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setForm({ name: '', email: '', phone: '', interest: '', message: '' });
    }, 800);
  };

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title="Contact Us | Bhavigna Lakshmi Jewellery"
      description="Get in touch with Bhavigna Lakshmi Jewellery for enquiries about our gold jewellery, bridal sets, vaddanam, and traditional South Indian collections. We'd love to help you find your perfect piece."
    >
      {/* Hero */}
      <div className={classes.pageHero}>
        <div className={classes.heroLabel}>We&rsquo;re Here to Help</div>
        <h1 className={classes.heroTitle}>Get in Touch</h1>
        <div className={classes.goldBar} />
        <p className={classes.heroSub}>
          Whether you&rsquo;re looking for the perfect bridal jewellery set or wish to know more about our collections,
          we&rsquo;d love to hear from you.
        </p>
      </div>

      <div className={classes.main}>
        {/* Form */}
        <div className={classes.formWrap}>
          <div className={classes.formLabel}>Send a Message</div>
          <h2 className={classes.formTitle}>How Can We Help You?</h2>

          {sent ? (
            <div className={classes.successMsg}>
              <strong>Thank you for reaching out!</strong><br />
              We&rsquo;ve received your message and will get back to you within 24 hours. For urgent enquiries,
              WhatsApp us at +91 92955 55504.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.row}>
                <div className={classes.fieldWrap}>
                  <label className={classes.fieldLabel}>Full Name *</label>
                  <input
                    className={classes.input}
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.fieldWrap}>
                  <label className={classes.fieldLabel}>Email *</label>
                  <input
                    className={classes.input}
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.fieldWrap}>
                  <label className={classes.fieldLabel}>Phone / WhatsApp</label>
                  <input
                    className={classes.input}
                    name="phone"
                    placeholder="+91 ..."
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.fieldWrap}>
                  <label className={classes.fieldLabel}>I&rsquo;m Interested In</label>
                  <div className={classes.selectWrap}>
                    <select className={classes.select} name="interest" value={form.interest} onChange={handleChange}>
                      <option value="">Select a collection</option>
                      <option value="bridal-sets">Bridal Sets</option>
                      <option value="earrings">Earrings</option>
                      <option value="vaddanam">Vaddanam</option>
                      <option value="long-harams">Long Harams</option>
                      <option value="short-neckset">Short Neckset</option>
                      <option value="jadabilla">Jadabilla</option>
                      <option value="chandraharam">Chandraharam</option>
                      <option value="diamond-finish">Diamond Finish</option>
                      <option value="nakshi-jewellery">Nakshi Jewellery</option>
                      <option value="cz-jewellery">CZ Jewellery</option>
                      <option value="panchaloham">Panchaloham</option>
                      <option value="blackbeads">Blackbeads</option>
                      <option value="gj-jewellery">GJ Jewellery</option>
                      <option value="beads-collections">Beads Collections</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={classes.fieldWrap}>
                <label className={classes.fieldLabel}>Message *</label>
                <textarea
                  className={classes.textarea}
                  name="message"
                  placeholder="Tell us about what you're looking for — occasion, budget, preferred colours..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={classes.submitBtn} disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className={classes.sidebar}>
          <div className={classes.infoCard}>
            <h3 className={classes.infoCardTitle}>Visit Our Boutique</h3>
            <div className={classes.infoItem}>
              <span className={classes.infoIcon}>📍</span>
              <div>
                <div className={classes.infoItemTitle}>Address</div>
                <div className={classes.infoItemText}>
                  Gajwel, Telangana 502110
                </div>
              </div>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.infoIcon}>📞</span>
              <div>
                <div className={classes.infoItemTitle}>Phone / WhatsApp</div>
                <div className={classes.infoItemText}>+91 92955 55504</div>
              </div>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.infoIcon}>✉</span>
              <div>
                <div className={classes.infoItemTitle}>Email</div>
                <div className={classes.infoItemText}>hello@bhavignalakshmi.com</div>
              </div>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.infoIcon}>📸</span>
              <div>
                <div className={classes.infoItemTitle}>Instagram</div>
                <div className={classes.infoItemText}>@bhavignalakshmicollections</div>
              </div>
            </div>
          </div>

          <div className={classes.hoursCard}>
            <h3 className={classes.hoursTitle}>Boutique Hours</h3>
            {HOURS.map((h) => (
              <div key={h.day} className={classes.hoursRow}>
                <span className={classes.hoursDay}>{h.day}</span>
                <span className={classes.hoursTime}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Contact.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
};

Contact.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(Contact);
