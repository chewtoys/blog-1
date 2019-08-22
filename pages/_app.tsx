import * as React from 'react';
import { Provider } from 'react-redux';
import { RematchStore } from '@rematch/core';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import withRematch from '../hoc/withRematch';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IAppProps {
  reduxStore: RematchStore;
}

class MyApp extends App<IAppProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRematch(MyApp);
