import Link from 'next/link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';

const styles = (theme) => ({
  pageHero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0D0408 0%, #2C0A1E 50%, #6B1530 100%)',
    padding: '120px 24px 96px',
    textAlign: 'center',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: { padding: '160px 48px 120px' },
  },
  heroPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.05,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  heroLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.38em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 16,
    position: 'relative',
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.8rem, 7vw, 5rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    lineHeight: 1.1,
    marginBottom: 24,
    position: 'relative',
  },
  heroDivider: {
    width: 48,
    height: 2,
    backgroundColor: '#C9A84C',
    margin: '0 auto 24px',
  },
  heroSub: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: 'rgba(253,248,240,0.7)',
    maxWidth: 560,
    margin: '0 auto',
    lineHeight: 1.6,
    position: 'relative',
  },

  section: {
    padding: '96px 24px',
    [theme.breakpoints.up('md')]: { padding: '120px 48px' },
  },
  inner: { maxWidth: 1200, margin: '0 auto' },

  // ── Origin story ──────────────────────────────────────────────
  originGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 64,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
  },
  label: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 14,
  },
  h2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400,
    color: '#1C0C00',
    lineHeight: 1.2,
    marginBottom: 24,
  },
  body: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.9,
    color: '#3D1C00',
    marginBottom: 16,
  },
  goldDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#C9A84C',
    marginBottom: 24,
  },
  imgStack: {
    position: 'relative',
  },
  imgMain: {
    width: '100%',
    height: 460,
    objectFit: 'cover',
  },
  imgAccent: {
    position: 'absolute',
    bottom: -24,
    right: -20,
    width: '45%',
    height: 200,
    objectFit: 'cover',
    border: '4px solid #FDF8F0',
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  accentBorder: {
    position: 'absolute',
    top: -16,
    left: -16,
    width: 80,
    height: 80,
    border: '2px solid rgba(201,168,76,0.5)',
    pointerEvents: 'none',
  },

  // ── Values ───────────────────────────────────────────────────
  valuesBg: { backgroundColor: '#1C0C00' },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 2,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
  valueCard: {
    padding: '44px 32px',
    borderRight: '1px solid rgba(201,168,76,0.1)',
    '&:last-child': { borderRight: 'none' },
  },
  valueNumber: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '3.5rem',
    fontWeight: 300,
    color: 'rgba(201,168,76,0.2)',
    lineHeight: 1,
    marginBottom: 16,
  },
  valueTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#FDF8F0',
    marginBottom: 12,
  },
  valueText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.8rem',
    lineHeight: 1.8,
    color: 'rgba(253,248,240,0.6)',
  },

  // ── Artisan ───────────────────────────────────────────────────
  artisanSection: { backgroundColor: '#FAF5ED' },
  artisanGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 64,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
  },
  artisanImgGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },
  artisanImg: {
    width: '100%',
    aspectRatio: '4/5',
    objectFit: 'cover',
  },

  // ── Collections highlight ─────────────────────────────────────
  collectionsSection: { backgroundColor: '#FDF8F0' },
  collectionsShowcase: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(6, 1fr)' },
  },
  showcaseItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '24px 12px',
    border: '1px solid rgba(201,168,76,0.2)',
    transition: 'all 0.25s',
    '&:hover': { backgroundColor: '#FAF5ED', borderColor: 'rgba(201,168,76,0.5)' },
  },
  showcaseIcon: {
    fontSize: '1.8rem',
    marginBottom: 10,
    display: 'block',
  },
  showcaseName: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#1C0C00',
  },

  // ── Milestones ────────────────────────────────────────────────
  milestonesSection: { backgroundColor: '#FAF5ED' },
  timeline: {
    position: 'relative',
    maxWidth: 800,
    margin: '0 auto',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(201,168,76,0.3)',
    // mobile: left-side line
    left: 16,
    [theme.breakpoints.up('sm')]: {
      left: '50%',
      transform: 'translateX(-1px)',
    },
  },
  // each milestone block
  milestoneItem: {
    position: 'relative',
    marginBottom: 48,
    // mobile: indent from left line
    paddingLeft: 44,
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      paddingLeft: 0,
      paddingRight: 52,
    },
  },
  // right-side items on desktop
  milestoneItemRight: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '50%',
      paddingRight: 0,
      paddingLeft: 52,
    },
  },
  milestoneDot: {
    position: 'absolute',
    top: 6,
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#C9A84C',
    border: '2px solid #FAF5ED',
    zIndex: 1,
    // mobile: sit on the left-side line
    left: 9,
    [theme.breakpoints.up('sm')]: {
      // left-side items: dot touches right edge → center line
      right: -7,
      left: 'auto',
    },
  },
  // dot for right-side items
  milestoneDotRight: {
    [theme.breakpoints.up('sm')]: {
      left: -7,
      right: 'auto',
    },
  },
  milestoneYear: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#8B1A3B',
    marginBottom: 4,
  },
  milestoneTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    color: '#1C0C00',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  milestoneText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.8rem',
    color: '#6B4C3B',
    lineHeight: 1.7,
  },

  // ── CTA ───────────────────────────────────────────────────────
  ctaSection: {
    backgroundColor: '#8B1A3B',
    padding: '80px 24px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    marginBottom: 16,
  },
  ctaSub: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: 'rgba(253,248,240,0.7)',
    marginBottom: 36,
    lineHeight: 1.7,
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: '#C9A84C',
    color: '#1C0C00',
    padding: '14px 40px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.25s',
    '&:hover': { backgroundColor: '#DFC278' },
  },
});

const VALUES = [
  {
    n: '01',
    title: 'Heritage Craftsmanship',
    text: 'We source exclusively from master goldsmiths and jewellery artisans who have carried forward their craft through generations — from temple jewellers of Hyderabad to kundan artisans of Rajasthan.',
  },
  {
    n: '02',
    title: 'Artisan Welfare',
    text: 'Fair wages, prompt payments, and long-term relationships with every craftsman family we work with. Their artistry and livelihood are our deepest responsibility.',
  },
  {
    n: '03',
    title: 'Hallmarked Quality',
    text: 'Every gold piece carries BIS hallmark certification. Every stone is sourced from certified suppliers. We never compromise on purity — your trust is our most precious metal.',
  },
  {
    n: '04',
    title: 'Timeless Design',
    text: 'We honour classical South Indian jewellery traditions while embracing thoughtful contemporary designs — pieces you will wear today, treasure tomorrow, and pass on for generations.',
  },
];

const MILESTONES = [
  {
    year: '2018',
    title: 'Founded in Gajwel',
    text: 'Bhagya Laxmi Jewellery opens its first boutique in Gajwel with a curated range of traditional South Indian gold jewellery — earrings, harams, and bridal sets handpicked from master craftsmen.',
  },
  {
    year: '2019',
    title: 'Expanding the Collection',
    text: 'Introduced 14 distinct jewellery categories including Vaddanam, Jadabilla, Chandraharam, Panchaloham, and Nakshi jewellery — celebrating the full breadth of South Indian adornment traditions.',
  },
  {
    year: '2020',
    title: 'Online Launch',
    text: 'Launched our digital storefront to serve jewellery lovers across India and the global diaspora who cherish authentic, handcrafted Indian jewellery from the comfort of their homes.',
  },
  {
    year: '2022',
    title: 'Bridal Jewellery Studio',
    text: 'Opened a dedicated bridal consultation studio in Gajwel offering bespoke bridal set styling, custom vaddanam fittings, and personalised jadabilla selections for every bride.',
  },
  {
    year: '2024',
    title: '1000+ Brides Adorned',
    text: 'Proud to have adorned over 1,000 brides and dressed countless families for weddings, festivals, and milestone celebrations across India and beyond.',
  },
];

const SHOWCASE = [
  { icon: '💛', name: 'Earrings' },
  { icon: '📿', name: 'Long Harams' },
  { icon: '💍', name: 'Bridal Sets' },
  { icon: '🪬', name: 'Vaddanam' },
  { icon: '✨', name: 'CZ Jewellery' },
  { icon: '🌙', name: 'Chandraharam' },
];

const About = ({ pathname, collections, classes }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="Our Story | Bhagya Laxmi Jewellery"
    description="The story behind Bhagya Laxmi Jewellery — a celebration of South Indian jewellery heritage, master goldsmithing, and timeless adornments crafted for life's most precious moments."
  >
    {/* ── Hero ──────────────────────────────────────────────────── */}
    <div className={classes.pageHero}>
      <div className={classes.heroPattern} />
      <div className={classes.heroLabel}>Our Story</div>
      <h1 className={classes.heroTitle}>
        Crafted with Gold<br />&amp; Devotion
      </h1>
      <div className={classes.heroDivider} />
      <p className={classes.heroSub}>
        A journey born from the belief that India's extraordinary jewellery traditions deserve to be celebrated, preserved, and worn close to the heart.
      </p>
    </div>

    {/* ── Origin ────────────────────────────────────────────────── */}
    <section className={classes.section}>
      <div className={classes.inner}>
        <div className={classes.originGrid}>
          <div>
            <div className={classes.label}>How It All Began</div>
            <h2 className={classes.h2}>
              A Passion Born from India's Jewellery Heritage
            </h2>
            <div className={classes.goldDivider} />
            <p className={classes.body}>
              Bhagya Laxmi Jewellery was founded in Gajwel by a family deeply rooted in South India's
              rich jewellery tradition. Growing up surrounded by the splendour of temple jewellery, the
              glitter of gold harams, and the sacred beauty of vaddanams worn at every celebration, our
              founders felt a deep calling — to bring these treasured traditions to every home.
            </p>
            <p className={classes.body}>
              After years of travelling across jewellery-making hubs in Hyderabad, Nellore, Chennai, and
              Rajasthan — sitting with master goldsmiths, learning the art of nakshi engraving, jadabilla
              weaving, and kundan setting — we opened our boutique in 2018. Today, we are proud to adorn
              brides, mothers, and daughters for their most cherished life moments.
            </p>
            <p className={classes.body}>
              Every piece in our collection is a dialogue between the past and the present — honouring
              ancient goldsmithing techniques while speaking to the modern Indian woman who wears her
              heritage with pride.
            </p>
          </div>
          <div className={classes.imgStack}>
            <div className={classes.accentBorder} />
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=560&h=460&q=80"
              alt="Bridal jewellery collection"
              className={classes.imgMain}
            />
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=320&h=200&q=80"
              alt="Gold earrings close-up"
              className={classes.imgAccent}
            />
          </div>
        </div>
      </div>
    </section>

    {/* ── Values ────────────────────────────────────────────────── */}
    <section className={`${classes.section} ${classes.valuesBg}`}>
      <div className={classes.inner}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className={classes.label} style={{ color: '#C9A84C' }}>What Guides Us</div>
          <h2 className={classes.h2} style={{ color: '#FDF8F0' }}>Our Four Pillars</h2>
        </div>
        <div className={classes.valuesGrid}>
          {VALUES.map((v) => (
            <div key={v.n} className={classes.valueCard}>
              <div className={classes.valueNumber}>{v.n}</div>
              <div className={classes.valueTitle}>{v.title}</div>
              <p className={classes.valueText}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Artisans ──────────────────────────────────────────────── */}
    <section className={`${classes.section} ${classes.artisanSection}`}>
      <div className={classes.inner}>
        <div className={classes.artisanGrid}>
          <div className={classes.artisanImgGrid}>
            {[
              'photo-1596944924616-7b38e7cfac36',
              'photo-1515562141207-7a88fb7ce338',
              'photo-1573408301185-9519f94797e4',
              'photo-1599643477877-530eb83abc8e',
            ].map((id) => (
              <img
                key={id}
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&h=375&q=80`}
                alt="Jewellery craftsmanship"
                className={classes.artisanImg}
              />
            ))}
          </div>
          <div>
            <div className={classes.label}>The Hands Behind Every Piece</div>
            <h2 className={classes.h2}>Celebrating India's Master Goldsmiths</h2>
            <div className={classes.goldDivider} />
            <p className={classes.body}>
              Behind every piece we carry are the extraordinarily skilled hands of India's jewellery
              artisans. A single nakshi-engraved necklace takes a master craftsman 5 to 10 days of
              painstaking work. A full bridal vaddanam can take up to 3 weeks of detailed handwork.
              These are not just ornaments — they are living art.
            </p>
            <p className={classes.body}>
              We work directly with goldsmith families in Hyderabad's Laad Bazaar, Nellore's jewellery
              clusters, and Rajasthan's kundan artisan communities. By paying above-market rates and
              maintaining long-term partnerships, we ensure that these extraordinary skills are passed
              down to the next generation.
            </p>
            <p className={classes.body}>
              When you buy from Bhagya Laxmi Jewellery, you are not just purchasing an ornament —
              you are sustaining a living tradition and honouring the craftsmen who keep it alive.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── Collections Showcase ──────────────────────────────────── */}
    <section className={`${classes.section} ${classes.collectionsSection}`}>
      <div className={classes.inner}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className={classes.label}>What We Offer</div>
          <h2 className={classes.h2}>14 Categories of Handcrafted Jewellery</h2>
          <p className={classes.body} style={{ maxWidth: 560, margin: '0 auto' }}>
            From everyday earrings to grand bridal sets, from sacred panchaloham bangles to
            sparkling CZ jewellery — our range covers every occasion and every jewellery need.
          </p>
        </div>
        <div className={classes.collectionsShowcase}>
          {SHOWCASE.map((s) => (
            <div key={s.name} className={classes.showcaseItem}>
              <span className={classes.showcaseIcon}>{s.icon}</span>
              <span className={classes.showcaseName}>{s.name}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/gallery" passHref>
            <a className={classes.ctaBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
              Explore All Collections
            </a>
          </Link>
        </div>
      </div>
    </section>

    {/* ── Milestones ────────────────────────────────────────────── */}
    <section className={`${classes.section} ${classes.milestonesSection}`}>
      <div className={classes.inner}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className={classes.label}>Our Journey</div>
          <h2 className={classes.h2}>Milestones in Gold &amp; Time</h2>
        </div>
        <div className={classes.timeline}>
          <div className={classes.timelineLine} />
          {MILESTONES.map((m, idx) => {
            const isRight = idx % 2 === 1;
            return (
              <div
                key={m.year}
                className={`${classes.milestoneItem} ${isRight ? classes.milestoneItemRight : ''}`}
              >
                <div className={`${classes.milestoneDot} ${isRight ? classes.milestoneDotRight : ''}`} />
                <div className={classes.milestoneYear}>{m.year}</div>
                <div className={classes.milestoneTitle}>{m.title}</div>
                <p className={classes.milestoneText}>{m.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────────────── */}
    <section className={classes.ctaSection}>
      <h2 className={classes.ctaTitle}>Ready to Find Your Perfect Jewellery?</h2>
      <p className={classes.ctaSub}>
        Explore our 14 collections — each piece handcrafted with tradition, love, and the finest materials.
      </p>
      <Link href="/gallery" passHref>
        <a className={classes.ctaBtn}>Explore Collections</a>
      </Link>
    </section>
  </Layout>
);

About.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
};

About.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(About);
