import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBagIcon from '@material-ui/icons/ShoppingBasket';
import { withStyles } from '@material-ui/core/styles';

import NavDrawer from '../NavDrawer/NavDrawer';
import CartDrawer from '../CartDrawer/CartDrawer';
import { DrawerContext } from '../DrawerContext';
import { clearOption } from '../../store/actions';
import { COLLECTION_META } from '../../data/products';

const styles = (theme) => ({
  appBar: {
    backgroundColor: '#FDF8F0',
    borderBottom: '1px solid rgba(139,26,59,0.12)',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
  },
  toolbar: {
    minHeight: 72,
    padding: '0 24px',
    [theme.breakpoints.up('md')]: { padding: '0 48px' },
  },
  brandWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    userSelect: 'none',
    gap: 12,
    [theme.breakpoints.down('sm')]: { justifyContent: 'center', flex: 1 },
  },
  logoImg: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    flexShrink: 0,
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  brandName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.35rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: '#8B1A3B',
    lineHeight: 1.1,
    textTransform: 'uppercase',
  },
  brandTagline: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    color: '#C9A84C',
    textTransform: 'uppercase',
    fontWeight: 500,
    marginTop: 2,
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  tabs: {
    display: 'none',
    [theme.breakpoints.up('md')]: { display: 'flex' },
  },
  tab: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.7rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#1C0C00',
    minWidth: 'unset',
    padding: '6px 16px',
    '&.Mui-selected': { color: '#8B1A3B' },
  },
  menuToggle: {
    display: 'flex',
    color: '#1C0C00',
    [theme.breakpoints.up('md')]: { display: 'none' },
  },
  menuItem: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '12px 24px',
    color: '#1C0C00',
    '&:hover': { color: '#8B1A3B', backgroundColor: '#FAF0F0' },
  },
  cartBtn: {
    color: '#1C0C00',
    marginLeft: 8,
  },
  goldDivider: {
    display: 'inline-block',
    width: 32,
    height: 1,
    backgroundColor: '#C9A84C',
    margin: '0 8px',
    verticalAlign: 'middle',
  },
});

class NavBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.arrayOf(PropTypes.string),
    pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    uniqueCartItems: PropTypes.number,
    clearOptionRedux: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.toggleDrawer = (type, open) => () => {
      this.setState(() => ({ [type]: open }));
    };
    this.state = {
      anchorEl: null,
      drawerNav: false,
      drawerCart: false,
      toggleDrawer: this.toggleDrawer,
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', () => window.scrollTo(0, 0));
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', () => window.scrollTo(0, 0));
  }

  handleTabChange = (_, value) => {
    const { clearOptionRedux } = this.props;
    if (value !== '/gallery') {
      Router.push(value);
      clearOptionRedux();
    }
  };

  openMenu = (e) => this.setState({ anchorEl: e.currentTarget });
  closeMenu = () => this.setState({ anchorEl: null });

  handleMenuItemClick = (href, as) => () => {
    const { clearOptionRedux } = this.props;
    this.closeMenu();
    Router.push(href, as);
    clearOptionRedux();
  };

  render() {
    const { classes, collections, pathname, uniqueCartItems } = this.props;
    const { anchorEl } = this.state;

    const tabValue = pathname === '/' ? '/gallery' : pathname || '/gallery';

    return (
      <DrawerContext.Provider value={this.state}>
        <NavDrawer collections={collections} />
        <CartDrawer />
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolbar}>
            {/* Hamburger – mobile */}
            <IconButton
              className={classes.menuToggle}
              edge="start"
              aria-label="menu"
              onClick={this.toggleDrawer('drawerNav', true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand */}
            <Link href="/" passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={classes.brandWrapper} style={{ textDecoration: 'none' }}>
                <img
                  src="/images/bhavigna laxmi logo.webp"
                  alt="Bhavigna Lakshmi Logo"
                  className={classes.logoImg}
                />
                <div className={classes.brandText}>
                  <span className={classes.brandName}>Bhavigna Lakshmi</span>
                  <span className={classes.brandTagline}>
                    <span className={classes.goldDivider} />
                    Collections
                    <span className={classes.goldDivider} />
                  </span>
                </div>
              </a>
            </Link>

            {/* Desktop nav */}
            <Tabs
              value={tabValue}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              className={classes.tabs}
              TabIndicatorProps={{
                style: { backgroundColor: '#8B1A3B', height: 2 },
              }}
            >
              <Tab label="Collections" value="/gallery" className={classes.tab} onClick={this.openMenu} />
              <Tab label="About" value="/about" className={classes.tab} />
              <Tab label="Contact" value="/contact" className={classes.tab} />
            </Tabs>

            {/* Collections dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeMenu}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              PaperProps={{
                style: {
                  borderRadius: 0,
                  border: '1px solid rgba(139,26,59,0.15)',
                  boxShadow: '0 8px 32px rgba(28,12,0,0.12)',
                  minWidth: 220,
                },
              }}
            >
              <MenuItem onClick={this.handleMenuItemClick('/gallery')} className={classes.menuItem}>
                All Collections
              </MenuItem>
              {(collections || []).map((col) => (
                <MenuItem
                  key={col}
                  onClick={this.handleMenuItemClick(`/gallery?collection=${col}`, `/gallery/${col}`)}
                  className={classes.menuItem}
                >
                  {COLLECTION_META[col]?.label || col}
                </MenuItem>
              ))}
            </Menu>

            {/* Cart */}
            <IconButton
              className={classes.cartBtn}
              aria-label="Shopping cart"
              onClick={this.toggleDrawer('drawerCart', true)}
            >
              <Badge badgeContent={uniqueCartItems} color="primary" max={9}>
                <ShoppingBagIcon style={{ fontSize: 22 }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DrawerContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  uniqueCartItems: state.cart.length,
});
const mapDispatchToProps = (dispatch) => ({
  clearOptionRedux: () => dispatch(clearOption()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
