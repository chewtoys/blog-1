import * as React from 'react';

import RencentWidget from './RencentWidget';
import TagsWidget from './TagsWidget';

const Sidebar: React.SFC = () => {
  return (
    <div>
      <RencentWidget />
      <TagsWidget />
    </div>
  )
};

export default Sidebar;
