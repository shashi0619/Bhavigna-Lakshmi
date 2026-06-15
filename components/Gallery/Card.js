import Link from 'next/link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { COLLECTION_META } from '../../data/products';

const styles = {
  card: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#F0E8D8',
    textDecoration: 'none',
    '&:hover $img': { transform: 'scale(1.06)' },
    '&:hover $hoverLayer': { opacity: 1 },
  },
  imgWrap: {
    overflow: 'hidden',
    paddingBottom: '125%',
    position: 'relative',
  },
  img: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.55s ease',
  },
  hoverLayer: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(28,12,0,0.32)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  hoverBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#FDF8F0',
    border: '1px solid rgba(253,248,240,0.8)',
    padding: '9px 20px',
    backgroundColor: 'transparent',
  },
  meta: {
    padding: '12px 10px 16px',
  },
  collection: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.58rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 4,
  },
  name: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1rem',
    fontWeight: 500,
    color: '#1C0C00',
    lineHeight: 1.3,
    marginBottom: 5,
  },
  price: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#8B1A3B',
  },
};

const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

const Card = ({ item, classes }) => (
  <Link href={`/piece?slug=${item.slug}`} as={`/piece/${item.slug}`} passHref>
    <a className={classes.card} style={{ textDecoration: 'none' }}>
      <div className={classes.imgWrap}>
        <img
          src={item.frontImage}
          alt={item.name}
          className={classes.img}
        />
        <div className={classes.hoverLayer}>
          <span className={classes.hoverBtn}>View Details</span>
        </div>
      </div>
      <div className={classes.meta}>
        <div className={classes.collection}>
          {COLLECTION_META[item.group]?.label || item.group}
        </div>
        <div className={classes.name}>{item.name}</div>
        <div className={classes.price}>{formatPrice(item.price)}</div>
      </div>
    </a>
  </Link>
);

Card.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);
