import * as React from 'react';
import ReactGA from 'react-ga';

const IS_BROWSER = typeof window !== 'undefined';

const useAnalytics = () => {
  React.useEffect(() => {
    if (IS_BROWSER) {
      // @ts-ignore
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(process.env.GA_TRACKING_ID);
      }
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }, []);
};

export default useAnalytics;
