import Link from 'next/link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { COLLECTION_META } from '../../data/products';
import { addToCart } from '../../store/actions';

const styles = {
  card: {
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textDecoration: 'none',
    transition: 'box-shadow 0.22s, transform 0.22s',
    '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.14)', transform: 'translateY(-3px)' },
    '&:hover $img': { transform: 'scale(1.04)' },
  },
  imgWrap: {
    overflow: 'hidden',
    paddingBottom: '100%',
    position: 'relative',
    backgroundColor: '#f5f0ea',
  },
  img: {
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
  },
  meta: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  collection: {
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
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  name: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.83rem',
    fontWeight: 700,
    color: '#111',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 'auto',
    paddingTop: 8,
  },
  priceBlock: { display: 'flex', alignItems: 'center' },
  price: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1rem',
    fontWeight: 800,
    color: '#111',
    letterSpacing: '0.01em',
    lineHeight: 1,
  },
  priceLabel: { display: 'none' },
  addBtn: {
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
};

const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

const clampName = (name) => name.length > 32 ? name.slice(0, 32).trimEnd() + '…' : name;

const Card = ({ item, classes, addToCartRedux }) => (
  <Link href={`/piece?slug=${item.slug}`} as={`/piece/${item.slug}`} passHref>
    <a className={classes.card} style={{ textDecoration: 'none' }}>
      <div className={classes.imgWrap}>
        <img src={item.frontImage} alt={item.name} className={classes.img} />
        <button
          className={classes.heartBtn}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Wishlist"
        >♡</button>
      </div>
      <div className={classes.meta}>
        <div className={classes.name} title={item.name}>{clampName(item.name)}</div>
        <div className={classes.collection}>
          {COLLECTION_META[item.group]?.label || item.group}
        </div>
        <div className={classes.priceRow}>
          <span className={classes.price}>{formatPrice(item.price)}</span>
          <button
            className={classes.addBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCartRedux(item);
            }}
            aria-label={`Add ${item.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </a>
  </Link>
);

Card.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addToCartRedux: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToCartRedux: (item) => dispatch(addToCart(item)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Card));
