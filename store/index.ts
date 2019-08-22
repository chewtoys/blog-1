import { init, RematchStore } from '@rematch/core';

import posts from './posts';

export default (initialState: any = {}): RematchStore => {
  return init({
    models: {
      posts,
    },
    redux: {
      initialState,
    },
  });
};
