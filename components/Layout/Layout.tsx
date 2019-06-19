import * as React from 'react';
import styled from 'styled-components';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import Header from '../Header';
import Container from '../Container';

const Main = styled.main`
  margin-top: 70px;
  padding-bottom: 30px;
`;

const Layout: React.SFC = (props) => {
  return (
    <div>
      <Header />
      <Main>
        <Container>
          {props.children}
        </Container>
      </Main>
    </div>
  );
};

export default Layout;
