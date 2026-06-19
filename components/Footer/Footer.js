import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  footer: {
    backgroundColor: '#1C0C00',
    color: '#FDF8F0',
    padding: '64px 48px 40px',
    marginTop: 80,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '48px',
    maxWidth: 1200,
    margin: '0 auto',
    '@media (min-width: 768px)': { gridTemplateColumns: '2fr 1fr 1fr 1fr' },
  },
  brandCol: {},
  logoImg: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginBottom: 8,
    display: 'block',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  brandName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: '#C9A84C',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  brandTagline: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: 'rgba(253,248,240,0.6)',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  brandDesc: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    lineHeight: 1.8,
    color: 'rgba(253,248,240,0.7)',
    maxWidth: 280,
  },
  colTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: 20,
  },
  link: {
    display: 'block',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    color: 'rgba(253,248,240,0.7)',
    textDecoration: 'none',
    marginBottom: 12,
    letterSpacing: '0.04em',
    transition: 'color 0.2s',
    cursor: 'pointer',
    '&:hover': { color: '#C9A84C' },
  },
  divider: {
    borderColor: 'rgba(201,168,76,0.2)',
    margin: '48px 0 24px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    maxWidth: 1200,
    margin: '0 auto',
  },
  copy: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.75rem',
    color: 'rgba(253,248,240,0.45)',
    letterSpacing: '0.06em',
  },
  socialRow: {
    display: 'flex',
    gap: 20,
  },
  socialLink: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(253,248,240,0.5)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': { color: '#C9A84C' },
  },
  goldLine: {
    width: 40,
    height: 2,
    backgroundColor: '#C9A84C',
    margin: '16px 0',
  },
});

const FooterLink = ({ href, label, classes }) => (
  <Link href={href} passHref>
    <a className={classes.link}>{label}</a>
  </Link>
);

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <div className={classes.grid}>
      {/* Brand column */}
      <div className={classes.brandCol}>
        <div className={classes.brandRow}>
          <img
            src="/images/bhavigna laxmi logo.webp"
            alt="Bhavigna Lakshmi Logo"
            className={classes.logoImg}
          />
          <div>
            <div className={classes.brandName}>Bhavigna Lakshmi</div>
            <div className={classes.brandTagline}>Collections</div>
          </div>
        </div>
        <div className={classes.goldLine} style={{ marginTop: 0 }} />
        <Typography className={classes.brandDesc}>
          Celebrating the timeless artistry of Indian handloom and heritage
          craftsmanship. Every piece is a story woven in silk, thread, and tradition.
        </Typography>
      </div>

      {/* Collections */}
      <div>
        <div className={classes.colTitle}>Collections</div>
        <FooterLink href="/gallery?collection=bridal" label="Bridal" classes={classes} />
        <FooterLink href="/gallery?collection=festive" label="Festive Wear" classes={classes} />
        <FooterLink href="/gallery?collection=casual" label="Casual Elegance" classes={classes} />
        <FooterLink href="/gallery?collection=designer-blouses" label="Designer Blouses" classes={classes} />
      </div>

      {/* Company */}
      <div>
        <div className={classes.colTitle}>Company</div>
        <FooterLink href="/about" label="Our Story" classes={classes} />
        <FooterLink href="/contact" label="Contact Us" classes={classes} />
        <FooterLink href="/gallery" label="All Products" classes={classes} />
      </div>

      {/* Policies */}
      <div>
        <div className={classes.colTitle}>Policies</div>
        <FooterLink href="/care-guide" label="Care Guide" classes={classes} />
        <FooterLink href="/terms-conditions" label="Terms & Conditions" classes={classes} />
        <FooterLink href="/privacy-policy" label="Privacy Policy" classes={classes} />
      </div>
    </div>

    <hr className={classes.divider} />

    <div className={classes.bottom}>
      <span className={classes.copy}>
        &copy; {new Date().getFullYear()} Bhavigna Lakshmi Collections. All rights reserved.
      </span>
      <div className={classes.socialRow}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
          aria-label="Facebook"
        >
          Facebook
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
          aria-label="Pinterest"
        >
          Pinterest
        </a>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
