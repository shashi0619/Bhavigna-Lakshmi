import PropTypes from 'prop-types';
import Error from 'next/error';

import Layout from '../components/Layout';
import { COLLECTIONS } from '../data/products';

const CustomError = ({ statusCode, pathname = '/' }) => (
  <Layout
    collections={COLLECTIONS}
    title="Page Not Found | Bhavigna Lakshmi Jewellery"
    description="South Indian traditional jewellery and bridal adornments."
    pathname={pathname}
  >
    <Error statusCode={statusCode} />
  </Layout>
);

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

CustomError.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pathname: PropTypes.string,
};

export default CustomError;
