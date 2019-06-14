import * as React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap-grid.css';

import Header from '../Header';
import Container from '../Container';

const Main = styled.main`
  margin-top: 70px;
  padding-top: 25px;
`;

const Layout: React.SFC = (props) => {
  return (
    <div>
      <Header />
      <Main>
        <Container>
          <Row>
            <Col lg={8}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </Main>
    </div>
  );
};

export default Layout;
