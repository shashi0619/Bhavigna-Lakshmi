import PropTypes from 'prop-types';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  ImageWrapper,
  Text,
  Figure,
} from '../styles/TermsAndConditions';
import { StyledAnchorLink } from '../styles/Shared';
const TermsImage = '/images/bhavigna laxmi logo.webp';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const TermsAndConditions = ({ collections, classes, user }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Terms and Conditions | Bhavigna Laxmi Jewellery"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={TermsImage} alt="Bhavigna Laxmi Jewellery collection" />
          <figcaption>
            <Typography
              align="center"
              variant="subtitle2"
              style={{ fontWeight: 300 }}
            >
              Bhavigna Laxmi Jewellery &mdash; Handcrafted with love
            </Typography>
          </figcaption>
        </Figure>
      </ImageWrapper>
      <Text>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          INFORMATION ON THE SITE
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          At Bhavigna Laxmi Jewellery, we make every effort to ensure our
          online gallery &amp; shop is as accurate and complete as possible.
          Some pieces may appear larger or smaller than their actual size in
          photographs. Since every screen is calibrated differently, colours
          may vary slightly from what is seen on your device.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          PRODUCT AVAILABILITY
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          All jewellery at Bhavigna Laxmi Jewellery is handcrafted with care
          and attention to detail. Each piece is unique and made to the
          highest standard. If a piece you love is currently unavailable,
          please contact us to discuss a custom or commission order tailored
          to your personal style.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Production times are indicated on each item listing. Typically it
          takes 1&ndash;4 weeks plus shipping time. If you have any questions,
          please do not hesitate to get in touch.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          SHIPPING
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          All orders are carefully packed and dispatched within 3 business
          days of confirmed purchase and payment. We use reliable tracked
          shipping services to ensure your jewellery arrives safely.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Please note that <i>made to order</i> items have individual
          production times as indicated in each listing. Delivery options for
          commission orders are discussed individually by{' '}
          <Link href="/contact" passHref>
            <StyledAnchorLink>e-mail</StyledAnchorLink>
          </Link>
          .
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          We always obtain proof of postage. If you would like to upgrade your
          shipping method (e.g. express or next day delivery), please contact
          us before placing your order and we will be happy to assist.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Please ensure you have entered the correct delivery address at
          checkout. Bhavigna Laxmi Jewellery cannot be held responsible for
          orders lost due to incorrect address details provided.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          SHIPPING COSTS
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Shipping is free of charge on all orders.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Estimated delivery times: 1&ndash;3 days domestically, 3&ndash;7 days
          within the region, and 7&ndash;14 days for international orders.
          Delivery times may be extended during busy periods such as festive
          seasons.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          International customers are responsible for any applicable customs
          duties or import charges levied by their country.
        </Typography>
        <Typography
          color="secondary"
          variant="h2"
          gutterBottom
          className={classes.heading}
        >
          RETURNS &amp; REFUNDS
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          At Bhavigna Laxmi Jewellery, every piece is handcrafted with love
          and we hope you are completely delighted with your purchase. If for
          any reason you are not satisfied, please contact us within 14 days
          of receiving your order so we can resolve the matter promptly.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          We accept returns provided the request is made within 14 days of
          receiving the item. Refunds are issued once we receive the item back
          in its original unused condition and original packaging.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          The full purchase amount will be refunded. Return shipping costs are
          the responsibility of the buyer.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Custom and commission pieces cannot be returned or refunded as they
          are made specifically to your personal requirements.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Returns requested after the 14-day window cannot be accepted.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

TermsAndConditions.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

TermsAndConditions.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(TermsAndConditions);
