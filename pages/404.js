import PropTypes from 'prop-types';
import Link from 'next/link';

import Layout from '../components/Layout';

const styles = {
  wrap: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '96px 24px',
  },
  eyebrow: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: 20,
  },
  code: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
    color: '#1C0C00',
    lineHeight: 1,
    margin: 0,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
    color: '#1C0C00',
    margin: '18px 0 12px',
  },
  body: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'rgba(28,12,0,0.65)',
    maxWidth: 440,
    margin: '0 0 36px',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  primaryBtn: {
    display: 'inline-block',
    padding: '15px 36px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#FDF8F0',
    backgroundColor: '#8B1A3B',
    textDecoration: 'none',
    borderRadius: 2,
  },
  secondaryBtn: {
    display: 'inline-block',
    padding: '15px 36px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#1C0C00',
    border: '1.5px solid #1C0C00',
    textDecoration: 'none',
    borderRadius: 2,
  },
};

const CustomError = ({
  pathname = '/',
  collections = ['earrings', 'long-harams', 'bridal-sets'],
}) => (
  <Layout
    collections={collections}
    title="Page Not Found | Bhavigna Lakshmi Collections"
    description="The page you're looking for couldn't be found. Explore our South Indian gold and bridal jewellery collections at Bhavigna Lakshmi."
    pathname={pathname}
  >
    <div style={styles.wrap}>
      <span style={styles.eyebrow}>Bhavigna Lakshmi</span>
      <p style={styles.code}>404</p>
      <h1 style={styles.heading}>This page couldn&apos;t be found</h1>
      <p style={styles.body}>
        The piece you&apos;re looking for may have sold out or moved. Let&apos;s get you back to
        browsing our gold and bridal jewellery collections.
      </p>
      <div style={styles.actions}>
        <Link href="/gallery" passHref>
          <a style={styles.primaryBtn}>Browse Collections</a>
        </Link>
        <Link href="/" passHref>
          <a style={styles.secondaryBtn}>Back to Home</a>
        </Link>
      </div>
    </div>
  </Layout>
);

CustomError.propTypes = {
  pathname: PropTypes.string,
  collections: PropTypes.arrayOf(PropTypes.string),
};

export default CustomError;
