import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import withStyles, { WithSheet } from 'react-jss';

import Copyright from './Copyright';
import ExtraLinks from './ExtraLinks';
import FooterContext from './context';

const styles = (theme: any) => ({
  footer: {
    height: '180px',
    padding: '30px 10px 40px',
    background: theme.footerBackground,
    overflow: 'auto',
  },
  '@media (max-width: 992px)': {
    footer: {
      padding: '30px 0 20px',
    },
  },
});

type IFooterProps = WithSheet<typeof styles> & {
  metadata: ISiteMetadata;
}

const Footer = (props: IFooterProps) => {
  const { classes, metadata } = props;
  const { title, since, author, menu, socials, friends } = metadata;

  const footerContext = {
    title,
    since,
    author,
    menu,
    socials,
    friends,
  };

  return (
    <FooterContext.Provider value={footerContext}>
      <footer className={classes.footer}>
        <Container>
          <Row>
            <Col lg={12}>
              <Copyright />
              <ExtraLinks />
            </Col>
          </Row>
        </Container>
      </footer>
    </FooterContext.Provider>
  );
};

export default withStyles(styles)(Footer);
