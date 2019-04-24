import * as React from 'react';

import { getBrowserWindow } from '../utils/helpers';

const NotFoundPage = () => {
  if (!getBrowserWindow()) {
    return null;
  }

  return (
    <div>
      <h1>NOT FOUND</h1>
    </div>
  );
};

export default NotFoundPage;
