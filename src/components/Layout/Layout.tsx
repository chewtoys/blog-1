import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import withStyles, { WithSheet } from 'react-jss';
import _ from 'lodash/fp';

import Header from '../Header';
import Footer from '../Footer';

const styles = (theme: any) => ({
  wrapper: {
    '& .container': {
      overflow: 'hidden',
      padding: '0 50px',
    },
  },
  content: {
    minHeight: 'calc(100vh - 273px)',
    marginTop: '70px',
    paddingTop: '20px',
  },
  '@media (max-width: 576px)': {
    content: {
      paddingTop: '0',
    }
  },
  '@media (max-width: 992px)': {
    wrapper: {
      '& .container': {
        padding: '0 20px',
      },
    }
  },
});

type ILayoutProps = WithSheet<typeof styles> & {
  location: Location;
  children: React.ReactNode;
};

const Layout = (props: ILayoutProps) => {
  const { classes,  location } = props;
  const data = useStaticQuery(graphql`
    query GetSiteMetadata {
      site {
        siteMetadata {
          title
          since
          author
          menu {
            name
            path
            header
          }
          socials {
            name
            link
          }
          friends {
            name
            link
          }
        }
      }
    }
  `);
  const metadata = _.get('site.siteMetadata', data);

  return (
    <div className={classes.wrapper}>
      <Header location={location} metadata={metadata} />
      <main className={classes.content}>
        {props.children}
      </main>
      <Footer metadata={metadata} />
    </div>
  );
};

export default withStyles(styles)(Layout);

