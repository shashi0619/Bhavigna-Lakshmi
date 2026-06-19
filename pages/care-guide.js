import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  Figure,
  Text,
  List,
  ListItem,
} from '../styles/CareGuide';
import { ImageWrapper } from '../styles/TermsAndConditions';
const Necklaces = '/images/bhavigna laxmi logo.webp';

const styles = () => ({
  heading: {
    fontSize: '2rem',
    margin: '4rem 0 2rem 0',
  },
});

const CareGuide = ({ collections, classes, user }) => (
  // false for Material UI Tabs to know this endpoint not needed
  <Layout
    pathname={false}
    collections={collections}
    title="Care Guide | Bhavigna Laxmi Jewellery"
    user={user}
  >
    <Wrapper>
      <ImageWrapper>
        <Figure>
          <Image src={Necklaces} alt="Bhavigna Laxmi Jewellery" />
        </Figure>
      </ImageWrapper>
      <Text>
        <Typography
          align="left"
          color="secondary"
          variant="h2"
          paragraph
          className={classes.heading}
        >
          GENERAL JEWELLERY CARE GUIDE
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Store each piece of jewellery separately in a soft pouch or
              individual box to prevent scratching and tangling. This is
              especially important for gold-plated and stone-set pieces.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Keep jewellery away from damp and humid conditions. Do not store
              near bathrooms, windowsills, or heating vents as moisture
              accelerates tarnishing.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Always apply perfumes, lotions, creams, and hairsprays before
              putting on your jewellery. Chemicals in these products can react
              with metals and cause discolouration.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Remove jewellery before exercising, cleaning, cooking, gardening,
              or any physical activity to avoid damage and premature wear.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Always remove jewellery before bathing, swimming in a pool, or
              entering the sea. Chlorine and salt water can damage metals and
              loosen stone settings.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Avoid wearing jewellery overnight. Sleeping with jewellery on can
              bend delicate pieces and cause unnecessary wear over time.
            </Typography>
          </ListItem>
        </List>
        <Typography
          align="left"
          color="secondary"
          variant="h2"
          paragraph
          className={classes.heading}
        >
          GOLD &amp; SILVER JEWELLERY CARE
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Clean gold jewellery with a soft brush dipped in mild soapy warm
              water. Rinse well and pat dry with a soft lint-free cloth.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              For gold-plated jewellery, wipe gently with a damp soft cloth.
              Avoid abrasive cleaners or scrubbing as these can remove the
              plating over time.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Polish silver jewellery regularly with a silver polishing cloth to
              maintain its shine and prevent tarnish from building up.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Store silver pieces in anti-tarnish pouches or wrap them in
              acid-free tissue paper when not in use.
            </Typography>
          </ListItem>
        </List>
        <Typography
          align="left"
          color="secondary"
          variant="h2"
          paragraph
          className={classes.heading}
        >
          STONE &amp; GEMSTONE JEWELLERY CARE
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Handle gemstone jewellery with extra care. Avoid dropping or
              knocking stone-set pieces against hard surfaces as this can chip
              or crack the stones.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Clean gemstone jewellery gently with a soft damp cloth. Avoid
              soaking pieces as water can loosen adhesive settings.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" paragraph color="secondary">
              Keep gemstone pieces away from direct sunlight for prolonged
              periods as strong UV rays can fade the colour of certain stones
              over time.
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph color="secondary">
          At Bhavigna Laxmi Jewellery, every piece is handcrafted with care and
          passion. With the right care, your jewellery will remain as beautiful
          as the day you received it. If you have any questions about caring for
          a specific piece, please do not hesitate to contact us.
        </Typography>
      </Text>
    </Wrapper>
  </Layout>
);

CareGuide.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

export default withStyles(styles)(CareGuide);
