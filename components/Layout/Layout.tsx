import * as React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import Header from '../Header';
import Container from '../Container';
import { title, description, icon, themeColor } from '../../config.json';

const Main = styled.main`
  margin-top: 70px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const Layout: React.SFC = (props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href={icon} />
        <meta name="theme-color" content={themeColor} />
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Main>
        <Container>{props.children}</Container>
      </Main>
    </div>
  );
};

export default Layout;
