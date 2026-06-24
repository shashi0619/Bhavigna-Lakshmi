import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';

const WHATSAPP_NUMBER = '919295555504';

const buildWhatsAppLink = (cart) => {
  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const itemLines = cart
    .map((item, idx) => {
      const qty = item.quantity || 1;
      return `${idx + 1}. ${item.name} × ${qty}  —  ${formatINR(item.price * qty)}`;
    })
    .join('\n');

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const message = [
    '🛍️ *Order Enquiry – Bhavigna Lakshmi Jewellery*',
    '',
    itemLines,
    '',
    '──────────────────',
    `*Total: ${formatINR(total)}*`,
    '*Shipping: Free*',
    '',
    'Kindly confirm my order. Thank you! 🙏',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const styles = {
  list: {
    width: 320,
    marginTop: '8px',
  },
  cartHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px 10px',
    borderBottom: '1px solid #f0ece4',
  },
  cartTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#1C0C00',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.4rem',
    color: '#6B4C3B',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '2px 4px',
    borderRadius: 4,
    transition: 'color 0.2s',
    '&:hover': { color: '#1C0C00' },
  },
  cart: {
    paddingTop: '10px',
  },
  whatsappBtn: {
    display: 'block',
    margin: '20px 16px 8px',
    backgroundColor: '#25D366',
    color: '#fff',
    textAlign: 'center',
    padding: '14px 20px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 2,
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
};

class CartDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    uniqueCartItems: PropTypes.number,
    cart: PropTypes.array,
  };

  static contextType = DrawerContext;

  render() {
    const { classes, uniqueCartItems, cart } = this.props;
    const { drawerCart, toggleDrawer } = this.context;

    const sideCart = (
      <CartDrawerContent closeDrawer={toggleDrawer('drawerCart', false)} />
    );

    return (
      <Drawer
        anchor="right"
        open={drawerCart}
        onClose={toggleDrawer('drawerCart', false)}
        onOpen={toggleDrawer('drawerCart', true)}
      >
        <div className={classes.cartHeader}>
          <span className={classes.cartTitle}>Your Cart</span>
          <button
            className={classes.closeBtn}
            onClick={toggleDrawer('drawerCart', false)}
            aria-label="Close cart"
          >✕</button>
        </div>
        <div className={classes.list} role="button">
          {sideCart}
          {uniqueCartItems > 0 ? (
            <a
              href={buildWhatsAppLink(cart)}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.whatsappBtn}
            >
              📱 Order via WhatsApp
            </a>
          ) : null}
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  uniqueCartItems: state.cart.length,
  cart: state.cart,
});

export default connect(mapStateToProps)(withStyles(styles)(CartDrawer));
