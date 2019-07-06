import * as React from 'react';
import ReactGA from 'react-ga';

import { ga } from '../config.json';

const IS_BROWSER = typeof window !== 'undefined';

const useAnalytics = () => {
  React.useEffect(() => {
    if (IS_BROWSER) {
      // @ts-ignore
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(ga.trackingId);
      }
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }, []);
};

export default useAnalytics;
