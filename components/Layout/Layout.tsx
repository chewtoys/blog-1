import * as React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import Header from '../Header';
import Container from '../Container';
import Sidebar from '../Sidebar';

const Main = styled.main`
  margin-top: 60px;
  padding-bottom: 30px;
`;

const StyledCol = styled(Col)`
  padding: 0 10px;
`;

const Layout: React.SFC = (props) => {
  return (
    <div>
      <Header />
      <Main>
        <Container>
          <Row>
            <StyledCol lg={8}>
              {props.children}
            </StyledCol>
            <StyledCol lg={4}>
              <Sidebar />
            </StyledCol>
          </Row>
        </Container>
      </Main>
    </div>
  );
};

export default Layout;
