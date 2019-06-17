import * as React from 'react';

import RecommendWidget from './RecommendWidget';
import TagsWidget from './TagsWidget';

const Sidebar: React.SFC = () => {
  return (
    <div>
      <RecommendWidget />
      <TagsWidget />
    </div>
  );
};

export default Sidebar;
