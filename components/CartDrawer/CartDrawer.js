import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';

const WHATSAPP_NUMBER = '919295555504';

const buildWhatsAppLink = (cart) => {
  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const itemLines = cart
    .map((item, idx) =>
      `${idx + 1}. ${item.name} × ${item.quantity}  —  ${formatINR(item.price * item.quantity)}`
    )
    .join('\n');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const message = [
    '🛍️ *Order Enquiry – Bhagya Laxmi Jewellery*',
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
        {uniqueCartItems > 0 ? (
          <Typography className={classes.cart} variant="h5" align="center">
            Your Cart
          </Typography>
        ) : null}
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
