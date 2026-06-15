import PropTypes from 'prop-types';
import Head from 'next/head';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Main } from '../styles/Main';

const Layout = ({
  children,
  collections,
  pathname,
  title = 'Bhavigna Lakshmi Collections | Indian Ethnic Wear',
  description = 'Exquisite Indian ethnic wear — sarees, lehengas, and designer blouses crafted with heritage artisanship. Kanjivaram, Banarasi, Chanderi, and more.',
  user,
  image = '/images/Banner-1.JPG',
  piecePath,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={process.env.NEXT_PUBLIC_APP_URL + image} />
      <meta
        property="og:url"
        content={piecePath || process.env.NEXT_PUBLIC_APP_URL + pathname}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_APP_URL + image}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@DKondrasovaite" />
      {piecePath && (
        <>
          <meta property="og:image:width" content="900" />
          <meta property="og:image:height" content="900" />
        </>
      )}
    </Head>
    <div>
      <NavBar pathname={pathname} collections={collections} user={user} />
    </div>
    <Main>{children}</Main>
    <Footer />
    <a
      href="https://wa.me/919295555504"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat on WhatsApp"
    >
      <span className="wa-tooltip">Chat with us</span>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.479-2.001A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.484-.289-5.031 1.187 1.275-4.896-.316-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.269-9.943c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.63-.199-.896.199s-1.029 1.294-1.261 1.56c-.232.266-.465.3-.863.1s-1.681-.619-3.2-1.975c-1.182-1.054-1.98-2.357-2.212-2.755-.232-.398-.025-.614.175-.812.18-.179.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.199-.896-2.161-1.228-2.96-.323-.777-.651-.672-.896-.684l-.763-.013c-.266 0-.697.1-1.062.498s-1.394 1.362-1.394 3.323 1.427 3.856 1.626 4.122c.199.266 2.808 4.288 6.804 6.015.951.41 1.693.655 2.272.839.954.303 1.822.26 2.509.158.765-.114 2.354-.962 2.686-1.891.332-.93.332-1.726.232-1.892-.099-.166-.365-.265-.763-.464z"/>
      </svg>
    </a>
  </>
);

Layout.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.string,
  image: PropTypes.string,
  piecePath: PropTypes.string,
};

export default Layout;
