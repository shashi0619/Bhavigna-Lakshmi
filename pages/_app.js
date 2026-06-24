import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import Head from 'next/head';

import withReduxStore from '../lib/with-redux-store';
import theme from '../src/theme';
import { saveCart } from '../util/helpers';
import { products, getCollections } from '../data/products';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../styles/global.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const collections = getCollections();

    pageProps = {
      ...pageProps,
      data: products,
      collections,
      router,
      user: null,
    };

    return { pageProps };
  }

  componentDidMount() {
    const { reduxStore } = this.props;

    reduxStore.subscribe(() => {
      saveCart(reduxStore.getState().cart);
    });

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <style>{`
            .card-name-clamp {
              display: -webkit-box !important;
              -webkit-line-clamp: 2 !important;
              -webkit-box-orient: vertical !important;
              overflow: hidden !important;
            }
          `}</style>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={reduxStore}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
