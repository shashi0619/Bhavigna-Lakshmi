import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { products, COLLECTIONS, COLLECTION_META } from '../data/products';
import { addToCart } from '../store/actions';

const styles = (theme) => ({
  pageHero: {
    backgroundColor: '#1C0C00',
    padding: '72px 24px 56px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: { padding: '96px 48px 72px' },
  },
  pageLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 12,
  },
  pageTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.4rem, 6vw, 4rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    letterSpacing: '0.04em',
    marginBottom: 16,
  },
  pageSubtitle: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    color: 'rgba(253,248,240,0.6)',
    letterSpacing: '0.08em',
  },
  goldDivider: {
    width: 48,
    height: 2,
    backgroundColor: '#C9A84C',
    margin: '20px auto',
  },

  filterBar: {
    backgroundColor: '#FDF8F0',
    borderBottom: '1px solid rgba(139,26,59,0.1)',
    position: 'sticky',
    top: 72,
    zIndex: 100,
  },
  filterBarInner: {
    maxWidth: 1280,
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  filterInner: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    padding: '0 24px',
    [theme.breakpoints.up('md')]: { padding: '0 48px' },
  },
  scrollArrow: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: '100%',
    minHeight: 56,
    background: 'linear-gradient(to right, #FDF8F0 60%, transparent)',
    border: 'none',
    cursor: 'pointer',
    color: '#8B1A3B',
    fontSize: '1.1rem',
    fontWeight: 700,
    padding: 0,
    transition: 'opacity 0.2s',
    zIndex: 2,
    '&:hover': { color: '#C9A84C' },
  },
  scrollArrowRight: {
    background: 'linear-gradient(to left, #FDF8F0 60%, transparent)',
  },
  scrollArrowHidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  filterBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.68rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#6B4C3B',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '18px 20px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    '&:hover': { color: '#8B1A3B' },
  },
  filterBtnActive: {
    color: '#8B1A3B',
    borderBottomColor: '#8B1A3B',
  },
  filterCount: {
    display: 'inline-block',
    backgroundColor: 'rgba(139,26,59,0.1)',
    color: '#8B1A3B',
    fontSize: '0.6rem',
    fontWeight: 700,
    borderRadius: 20,
    padding: '2px 8px',
    marginLeft: 6,
  },

  content: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '56px 24px 96px',
    [theme.breakpoints.up('md')]: { padding: '64px 48px 112px' },
  },
  resultCount: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.78rem',
    color: '#9B7B6A',
    marginBottom: 32,
    letterSpacing: '0.06em',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  },
  card: {
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.22s, transform 0.22s',
    '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.14)', transform: 'translateY(-3px)' },
    '&:hover $cardImg': { transform: 'scale(1.04)' },
  },
  cardImgWrap: {
    overflow: 'hidden',
    paddingBottom: '100%',
    position: 'relative',
    backgroundColor: '#f5f0ea',
  },
  cardImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.45s ease',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.93)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    zIndex: 2,
    boxShadow: '0 1px 5px rgba(0,0,0,0.14)',
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: '#fff' },
  },
  soldBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(28,12,0,0.72)',
    color: '#fff',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.52rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 20,
    zIndex: 2,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#8B1A3B',
    color: '#fff',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.52rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 20,
    zIndex: 2,
  },
  cardMeta: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardName: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.83rem',
    fontWeight: 700,
    color: '#111',
    lineHeight: 1.4,
    marginBottom: 6,
  },
  cardCollection: {
    display: 'inline-block',
    backgroundColor: '#f2f2f2',
    color: '#555',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.56rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '3px 9px',
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  cardPriceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 8,
    gap: 4,
  },
  cardPriceBlock: { display: 'flex', alignItems: 'center' },
  cardPrice: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1rem',
    fontWeight: 800,
    color: '#111',
    letterSpacing: '0.01em',
  },
  cardCategory: { display: 'none' },
  addCartBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#B8860B',
    backgroundColor: 'transparent',
    border: '1.5px solid #C9A84C',
    borderRadius: 20,
    padding: '5px 14px',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#C9A84C', color: '#fff' },
  },
  addedCartBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#2e6e3e',
    backgroundColor: '#e6f4ea',
    border: '1.5px solid #a8d5b5',
    borderRadius: 20,
    padding: '5px 12px',
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
  },

  empty: {
    textAlign: 'center',
    padding: '80px 24px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    color: '#9B7B6A',
    fontStyle: 'italic',
  },
});

const Gallery = ({ pathname, collections, router, classes, addToCartRedux, cart }) => {
  const queryCollection = router?.query?.collection || 'all';
  const [active, setActive] = useState(
    COLLECTIONS.includes(queryCollection) ? queryCollection : 'all'
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const filterRef = useRef(null);

  const checkScroll = useCallback(() => {
    const el = filterRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollLeft = () => filterRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () => filterRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  const filtered =
    active === 'all'
      ? products.filter((p) => p.display)
      : products.filter((p) => p.group === active && p.display);

  const handleFilter = (col) => {
    setActive(col);
    if (col === 'all') {
      Router.push('/gallery', undefined, { shallow: true });
    } else {
      Router.push(`/gallery?collection=${col}`, `/gallery/${col}`, { shallow: true });
    }
  };

  const activeTitle =
    active === 'all'
      ? 'All Collections'
      : COLLECTION_META[active]?.label || active;

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title={`${activeTitle} | Bhavigna Lakshmi Collections`}
      description="Explore our curated range of Indian ethnic wear — Kanjivaram sarees, Banarasi silk, bridal lehengas, festive wear, and designer blouses."
    >
      {/* Page hero */}
      <div className={classes.pageHero}>
        <div className={classes.pageLabel}>Bhavigna Lakshmi Collections</div>
        <h1 className={classes.pageTitle}>{activeTitle}</h1>
        <div className={classes.goldDivider} />
        <p className={classes.pageSubtitle}>
          {active !== 'all'
            ? COLLECTION_META[active]?.tagline
            : 'Handpicked ethnic wear crafted by India\'s finest artisans'}
        </p>
      </div>

      {/* Filter tabs */}
      <nav className={classes.filterBar}>
        <div className={classes.filterBarInner}>
          {/* Left scroll arrow */}
          <button
            className={`${classes.scrollArrow} ${!canScrollLeft ? classes.scrollArrowHidden : ''}`}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            ‹
          </button>

          {/* Scrollable tab strip */}
          <div className={classes.filterInner} ref={filterRef}>
            {['all', ...COLLECTIONS].map((col) => {
              const count = col === 'all'
                ? products.filter((p) => p.display).length
                : products.filter((p) => p.group === col && p.display).length;
              return (
                <button
                  key={col}
                  className={`${classes.filterBtn} ${active === col ? classes.filterBtnActive : ''}`}
                  onClick={() => handleFilter(col)}
                >
                  {col === 'all' ? 'All' : COLLECTION_META[col]?.label || col}
                  <span className={classes.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Right scroll arrow */}
          <button
            className={`${classes.scrollArrow} ${classes.scrollArrowRight} ${!canScrollRight ? classes.scrollArrowHidden : ''}`}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </nav>

      {/* Grid */}
      <div className={classes.content}>
        <p className={classes.resultCount}>
          Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
          {active !== 'all' ? ` in ${COLLECTION_META[active]?.label}` : ''}
        </p>

        {filtered.length === 0 ? (
          <div className={classes.empty}>No pieces found in this collection.</div>
        ) : (
          <div className={classes.grid}>
            {filtered.map((item) => (
              <div
                key={item._id}
                className={classes.card}
                onClick={() => Router.push(`/piece?slug=${item.slug}`, `/piece/${item.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && Router.push(`/piece?slug=${item.slug}`, `/piece/${item.slug}`)
                }
              >
                <div className={classes.cardImgWrap}>
                  <img src={item.frontImage} alt={item.name} className={classes.cardImg} />
                  <button
                    className={classes.heartBtn}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Wishlist"
                  >♡</button>
                  {item.featured && <span className={classes.newBadge}>Featured</span>}
                  {!item.available && <span className={classes.soldBadge}>Sold Out</span>}
                </div>
                <div className={classes.cardMeta}>
                  <div className={classes.cardName} title={item.name}>{item.name.length > 32 ? item.name.slice(0, 32).trimEnd() + '…' : item.name}</div>
                  <div className={classes.cardCollection}>
                    {COLLECTION_META[item.group]?.label || item.group}
                  </div>
                  <div className={classes.cardPriceRow}>
                    <span className={classes.cardPrice}>{formatPrice(item.price)}</span>
                    {cart.some((c) => c._id === item._id) ? (
                      <button
                        className={classes.addedCartBtn}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Added to cart"
                      >
                        ✓ Added
                      </button>
                    ) : (
                      <button
                        className={classes.addCartBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCartRedux(item);
                          window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                        }}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

Gallery.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  router: PropTypes.object,
  classes: PropTypes.object.isRequired,
  addToCartRedux: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

Gallery.getInitialProps = async ({ pathname }) => ({ pathname });

const mapStateToProps = (state) => ({ cart: state.cart });

const mapDispatchToProps = (dispatch) => ({
  addToCartRedux: (item) => dispatch(addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Gallery));
