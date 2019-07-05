import * as React from 'react';
import styled from 'styled-components';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import SEO from '../SEO';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';

const Main = styled.main`
  margin-top: 70px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const Layout: React.SFC = (props) => {
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
