import Router from 'next/router';

type RouteChangeCallback = (() => void) | ((url: string) => void);

const useRouteChange = (callback: RouteChangeCallback) => {
  Router.events.on('routeChangeComplete', (url: string) => {
    callback(url);
  });
};

export default useRouteChange;
