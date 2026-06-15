import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import ImageGallery from 'react-image-gallery';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { addToCart } from '../store/actions';
import { products, COLLECTION_META } from '../data/products';

const styles = (theme) => ({
  breadcrumb: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '20px 24px 0',
    [theme.breakpoints.up('md')]: { padding: '24px 48px 0' },
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    color: '#9B7B6A',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  breadLink: {
    color: '#9B7B6A',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': { color: '#8B1A3B' },
  },
  breadSep: { color: '#C9A84C', fontSize: '0.6rem' },

  wrapper: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '32px 24px 96px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 48,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
      padding: '40px 48px 112px',
      gap: 64,
    },
  },
  galleryWrap: {
    '& .image-gallery-thumbnail.active, & .image-gallery-thumbnail:hover': {
      borderColor: '#8B1A3B',
    },
  },
  info: {
    paddingTop: 8,
    [theme.breakpoints.up('md')]: { paddingTop: 0 },
  },
  collectionTag: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#C9A84C',
    display: 'inline-block',
  },
  productName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 400,
    color: '#1C0C00',
    lineHeight: 1.15,
    marginBottom: 20,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 16,
    marginBottom: 28,
    paddingBottom: 28,
    borderBottom: '1px solid rgba(139,26,59,0.12)',
  },
  price: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.9rem',
    fontWeight: 500,
    color: '#8B1A3B',
  },
  priceNote: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.72rem',
    color: '#9B7B6A',
    letterSpacing: '0.06em',
  },
  description: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.85,
    color: '#3D1C00',
    marginBottom: 28,
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px 24px',
    marginBottom: 32,
    padding: '24px',
    backgroundColor: '#FAF5ED',
    border: '1px solid rgba(201,168,76,0.15)',
  },
  detailItem: {},
  detailLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    color: '#3D1C00',
    fontWeight: 500,
  },
  soldOut: {
    padding: '16px 24px',
    backgroundColor: '#FAF0F0',
    border: '1px solid rgba(139,26,59,0.2)',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    color: '#8B1A3B',
    letterSpacing: '0.06em',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 500,
  },
  cartBtn: {
    display: 'block',
    width: '100%',
    padding: '16px 32px',
    backgroundColor: '#8B1A3B',
    color: '#FDF8F0',
    border: 'none',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginBottom: 12,
    '&:hover': { backgroundColor: '#5C0F27' },
    '&:disabled': { backgroundColor: '#9B7B6A', cursor: 'not-allowed' },
  },
  enquireBtn: {
    display: 'block',
    width: '100%',
    padding: '15px 32px',
    backgroundColor: 'transparent',
    color: '#8B1A3B',
    border: '1px solid #8B1A3B',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginBottom: 32,
    '&:hover': { backgroundColor: '#8B1A3B', color: '#FDF8F0' },
  },
  addedMsg: {
    textAlign: 'center',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.78rem',
    color: '#2E7D32',
    fontWeight: 600,
    letterSpacing: '0.1em',
    marginBottom: 16,
    padding: '10px',
    backgroundColor: '#E8F5E9',
  },
  serviceRow: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    paddingTop: 20,
    borderTop: '1px solid rgba(139,26,59,0.1)',
  },
  serviceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.72rem',
    color: '#6B4C3B',
    letterSpacing: '0.06em',
  },
  serviceIcon: { fontSize: '1rem' },

  relatedSection: {
    backgroundColor: '#FAF5ED',
    padding: '72px 24px',
    [theme.breakpoints.up('md')]: { padding: '80px 48px' },
  },
  relatedInner: { maxWidth: 1280, margin: '0 auto' },
  relatedLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 8,
  },
  relatedTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    fontWeight: 400,
    color: '#1C0C00',
    marginBottom: 40,
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
  relatedCard: {
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover $relatedImg': { transform: 'scale(1.05)' },
  },
  relatedImgWrap: {
    overflow: 'hidden',
    paddingBottom: '125%',
    position: 'relative',
    backgroundColor: '#F0E8D8',
  },
  relatedImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  relatedName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#1C0C00',
    marginTop: 10,
    marginBottom: 3,
  },
  relatedPrice: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#8B1A3B',
  },

  notFound: {
    textAlign: 'center',
    padding: '120px 24px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    color: '#9B7B6A',
    fontStyle: 'italic',
  },
});

const Piece = ({ onePieceData, collections, pathname, addToCartFn, classes }) => {
  const [added, setAdded] = useState(false);

  if (!onePieceData || onePieceData.length === 0) {
    return (
      <Layout pathname={pathname} collections={collections} title="Not Found | Bhavigna Lakshmi Collections">
        <div className={classes.notFound}>
          This piece could not be found.{' '}
          <Link href="/gallery"><a style={{ color: '#8B1A3B' }}>Browse our collections →</a></Link>
        </div>
      </Layout>
    );
  }

  const item = onePieceData[0];
  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  const gallery = item.images.map((img) => ({
    original: img.medium,
    thumbnail: img.thumb,
    originalAlt: item.name,
    thumbnailAlt: item.name,
  }));

  const handleAddToCart = () => {
    addToCartFn({ ...item, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const related = products
    .filter((p) => p.group === item.group && p._id !== item._id && p.display)
    .slice(0, 4);

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title={`${item.name} | Bhavigna Lakshmi Collections`}
      description={item.description}
    >
      {/* Breadcrumb */}
      <div className={classes.breadcrumb}>
        <Link href="/gallery"><a className={classes.breadLink}>Collections</a></Link>
        <span className={classes.breadSep}>✦</span>
        <Link href={`/gallery?collection=${item.group}`}>
          <a className={classes.breadLink}>{COLLECTION_META[item.group]?.label || item.group}</a>
        </Link>
        <span className={classes.breadSep}>✦</span>
        <span>{item.name}</span>
      </div>

      {/* Main layout */}
      <div className={classes.wrapper}>
        {/* Gallery */}
        <div className={classes.galleryWrap}>
          <ImageGallery
            items={gallery}
            lazyLoad
            showPlayButton={false}
            showFullscreenButton
            showNav={gallery.length > 1}
            thumbnailPosition="bottom"
          />
        </div>

        {/* Info panel */}
        <div className={classes.info}>
          <div className={classes.collectionTag}>
            <span className={classes.tagDot} />
            {COLLECTION_META[item.group]?.label || item.group}
          </div>
          <h1 className={classes.productName}>{item.name}</h1>

          <div className={classes.priceRow}>
            <span className={classes.price}>{formatPrice(item.price)}</span>
            <span className={classes.priceNote}>Tax included · Free shipping</span>
          </div>

          <p className={classes.description}>{item.description}</p>

          <div className={classes.detailsGrid}>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>Material</div>
              <div className={classes.detailValue}>{item.material}</div>
            </div>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>Category</div>
              <div className={classes.detailValue} style={{ textTransform: 'capitalize' }}>{item.category}</div>
            </div>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>Collection</div>
              <div className={classes.detailValue}>{COLLECTION_META[item.group]?.label}</div>
            </div>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>Care</div>
              <div className={classes.detailValue}>{item.care}</div>
            </div>
          </div>

          {!item.available && (
            <div className={classes.soldOut}>This piece is currently unavailable.</div>
          )}

          {added && <div className={classes.addedMsg}>✓ Added to your cart</div>}

          <button
            className={classes.cartBtn}
            onClick={handleAddToCart}
            disabled={!item.available}
          >
            {item.available ? 'Add to Cart' : 'Sold Out'}
          </button>
          <button
            className={classes.enquireBtn}
            onClick={() => Router.push('/contact')}
          >
            Enquire About This Piece
          </button>

          <div className={classes.serviceRow}>
            <span className={classes.serviceItem}><span className={classes.serviceIcon}>🚚</span> Free Delivery</span>
            <span className={classes.serviceItem}><span className={classes.serviceIcon}>📦</span> Gift Wrapped</span>
            <span className={classes.serviceItem}><span className={classes.serviceIcon}>↩</span> Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className={classes.relatedSection}>
          <div className={classes.relatedInner}>
            <div className={classes.relatedLabel}>From the same collection</div>
            <h2 className={classes.relatedTitle}>You May Also Love</h2>
            <div className={classes.relatedGrid}>
              {related.map((r) => (
                <div
                  key={r._id}
                  className={classes.relatedCard}
                  onClick={() => Router.push(`/piece?slug=${r.slug}`, `/piece/${r.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && Router.push(`/piece?slug=${r.slug}`, `/piece/${r.slug}`)}
                >
                  <div className={classes.relatedImgWrap}>
                    <img src={r.frontImage} alt={r.name} className={classes.relatedImg} />
                  </div>
                  <div className={classes.relatedName}>{r.name}</div>
                  <div className={classes.relatedPrice}>{formatPrice(r.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

Piece.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const item = products.find((p) => p.slug === slug) || null;
  return { onePieceData: item ? [item] : [] };
};

Piece.propTypes = {
  onePieceData: PropTypes.array,
  collections: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  addToCartFn: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToCartFn: (item) => dispatch(addToCart(item)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Piece));
