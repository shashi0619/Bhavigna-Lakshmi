import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  ImageWrapper,
  Text,
  Figure,
  List,
  ListItem,
} from '../styles/TermsAndConditions';
import PrivacyImage from '../public/images/Dovile-Jewellery-3.JPG';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const PrivacyPolicy = ({ collections, classes, user }) => (
  <Layout
    pathname={false}
    collections={collections}
    title="Privacy Policy | Bhavigna Laxmi Jewellery"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={PrivacyImage} alt="Bhavigna Laxmi Jewellery" />
          <figcaption>
            <Typography
              align="center"
              variant="subtitle2"
              style={{ fontWeight: 300 }}
            >
              Bhavigna Laxmi Jewellery &mdash; Every piece tells a story
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
          PRIVACY POLICY
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          This privacy policy describes how Bhavigna Laxmi Jewellery collects,
          uses, and protects any personal information you provide when using
          this website or making a purchase.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          Personal information is any data that can identify you as an
          individual, including your name, postal address, email address, and
          payment details.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          By visiting this website, placing an order, or subscribing to our
          newsletter, you agree that Bhavigna Laxmi Jewellery may process your
          information in accordance with this policy. You may withdraw your
          consent at any time by contacting us directly.
        </Typography>
        <Typography variant="body1" gutterBottom color="secondary">
          We may collect, store and use the following types of personal data:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Information provided as part of a purchase (name, email address,
              billing &amp; delivery address);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Information provided when subscribing to our newsletter (name and
              email address);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Any information you share when communicating with us via email,
              contact form, or social media;
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom color="secondary">
          We may use your personal information to:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Process and fulfil your jewellery orders and deliver them to you;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Send you order confirmations, invoices, and payment receipts;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Respond to your enquiries and provide customer support;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Send you our newsletter and promotional updates (you may
              unsubscribe at any time);
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Keep our website secure and prevent fraudulent activity;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Improve our products and services based on your feedback. We will
              always seek your permission before publishing any testimonials
              publicly.
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph color="secondary">
          Your card and payment information is never stored by Bhavigna Laxmi
          Jewellery. All transactions are securely processed by a trusted
          third-party payment provider that specialises in safe online payment
          handling.
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          We will never sell, share, or distribute your personal information to
          third parties except as necessary to fulfil your order (e.g. sharing
          your delivery address with our courier service).
        </Typography>
        <Typography variant="body1" paragraph color="secondary">
          You have the right to request access to, correction of, or deletion
          of your personal data held by us at any time. To make such a request,
          please contact us directly.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

PrivacyPolicy.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

PrivacyPolicy.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(PrivacyPolicy);
