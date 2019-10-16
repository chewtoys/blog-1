import { init, RematchStore } from '@rematch/core';

import app from './app';
import post from './post';

export default (initialState: any = {}): RematchStore => {
  return init({
    models: {
      app,
      post,
    },
    redux: {
      initialState,
    },
  });
};
