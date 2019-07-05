import ReactGA from 'react-ga';

import { ga } from '../config.json';

const IS_BROWSER = typeof window !== 'undefined';

const analytics = {
  initial() {
    // @ts-ignore
    if (IS_BROWSER && !window.GA_INITIALIZED) {
      ReactGA.initialize(ga.trackingId);
    }
  },

  pageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  },
};

export default analytics;
