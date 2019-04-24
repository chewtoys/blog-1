import * as React from 'react';
import { ThemeProvider } from 'react-jss';

import theme from '../../styles/theme';
import Layout from './Layout';

export default (props: any) => (
  <ThemeProvider theme={theme}>
    <Layout {...props} />
  </ThemeProvider>
);