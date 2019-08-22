import * as React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { RematchStore } from '@rematch/core';

import initialReduxState from '../store';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

interface IAppWithStoreProps extends AppProps {
  initialReduxState: any;
}

function getOrCreateStore(initialState?: any): RematchStore {
  if (typeof window === 'undefined') {
    return initialReduxState(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initialReduxState(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Component: React.ComponentType) => {
  // @ts-ignore
  return class AppWithStore extends App {
    static async getInitialProps(appContext: AppContext) {
      const reduxStore = getOrCreateStore();

      // @ts-ignore
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    reduxStore: RematchStore;

    constructor(props: IAppWithStoreProps) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      // @ts-ignore
      return <Component {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
