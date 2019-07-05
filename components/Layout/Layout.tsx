import * as React from 'react';
import styled from 'styled-components';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import SEO from '../SEO';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import analytics from '../../lib/analytics';

const Main = styled.main`
  margin-top: 70px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const Layout: React.SFC = (props) => {
  React.useEffect(() => {
    analytics.initial();
    analytics.pageView();
  }, []);

  return (
    <div>
      <SEO />
      <Header />
      <Main>
        <Container>{props.children}</Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;
