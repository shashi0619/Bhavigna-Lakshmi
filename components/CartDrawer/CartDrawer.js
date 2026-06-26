import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';

import { DrawerContext } from '../DrawerContext';
import CartDrawerContent from './CartDrawerContent';
import AddressForm from './AddressForm';
import PaymentStatus from './PaymentStatus';

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
  payBtn: {
    display: 'block',
    width: 'calc(100% - 32px)',
    margin: '16px 16px 8px',
    backgroundColor: '#8B1A3B',
    color: '#fff',
    textAlign: 'center',
    padding: '14px 20px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': { backgroundColor: '#6e1430' },
    '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
  },
  secureNote: {
    textAlign: 'center',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    color: '#9B7B6A',
    marginBottom: 12,
    letterSpacing: '0.04em',
  },
};

class CartDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    uniqueCartItems: PropTypes.number,
    cart: PropTypes.array,
  };

  static contextType = DrawerContext;

  state = { showAddressForm: false, loading: false, paymentStatus: null };

  loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  handleAddressSubmit = async (address) => {
    const { cart } = this.props;
    const { toggleDrawer } = this.context;

    this.setState({ showAddressForm: false, loading: true });

    // Close drawer first so Razorpay inputs work properly
    toggleDrawer('drawerCart', false)();

    const loaded = await this.loadRazorpayScript();
    if (!loaded) {
      this.setState({
        loading: false,
        paymentStatus: { success: false, data: { reason: 'Payment service unavailable. Please check your connection.' } },
      });
      return;
    }

    const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, address }),
      });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Bhavigna Lakshmi Jewellery',
        description: `${cart.length} item(s) — South Indian Jewellery`,
        image: '/images/bhavigna laxmi logo.webp',
        order_id: order.id,
        prefill: {
          name: address.name,
          email: address.email || '',
          contact: `+91${address.phone}`,
        },
        notes: {
          address: `${address.address1}, ${address.address2 || ''}, ${address.city}, ${address.state} - ${address.pincode}`,
          store: 'Bhavigna Lakshmi Jewellery, Gajwel, Telangana',
        },
        theme: { color: '#8B1A3B' },
        handler: async (response) => {
          // Verify + save payment on server
          await fetch('/api/confirm-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          this.setState({
            loading: false,
            paymentStatus: {
              success: true,
              data: {
                name: address.name,
                city: address.city,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: order.amount,
              },
            },
          });
        },
        modal: {
          ondismiss: () => this.setState({ loading: false }),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        this.setState({
          loading: false,
          paymentStatus: {
            success: false,
            data: { reason: response.error.description || 'Payment could not be processed.' },
          },
        });
      });
      rzp.open();
    } catch (err) {
      this.setState({
        loading: false,
        paymentStatus: { success: false, data: { reason: 'Something went wrong. Please try again.' } },
      });
    }
  };

  render() {
    const { classes, uniqueCartItems, cart } = this.props;
    const { drawerCart, toggleDrawer } = this.context;
    const { showAddressForm, loading, paymentStatus } = this.state;

    const total = cart
      ? cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
      : 0;

    return (
      <>
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
          <div className={classes.list}>
            <CartDrawerContent closeDrawer={toggleDrawer('drawerCart', false)} />
            {uniqueCartItems > 0 && (
              <>
                <button
                  className={classes.payBtn}
                  onClick={() => {
                    toggleDrawer('drawerCart', false)();
                    setTimeout(() => this.setState({ showAddressForm: true }), 300);
                  }}
                  disabled={loading}
                >
                  {loading ? 'Processing…' : '💳 Proceed to Pay'}
                </button>
                <p className={classes.secureNote}>
                  🔒 Secure payment · UPI · Cards · Net Banking
                </p>
              </>
            )}
          </div>
        </Drawer>

        {showAddressForm && (
          <AddressForm
            total={total}
            onSubmit={this.handleAddressSubmit}
            onClose={() => this.setState({ showAddressForm: false })}
          />
        )}

        {paymentStatus && (
          <PaymentStatus
            success={paymentStatus.success}
            data={paymentStatus.data}
            onClose={() => this.setState({ paymentStatus: null })}
            onRetry={
              !paymentStatus.success
                ? () => this.setState({ paymentStatus: null, showAddressForm: true })
                : undefined
            }
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  uniqueCartItems: state.cart.length,
  cart: state.cart,
});

export default connect(mapStateToProps)(withStyles(styles)(CartDrawer));
