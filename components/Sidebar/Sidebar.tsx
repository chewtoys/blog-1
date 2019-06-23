import * as React from 'react';

import RecommendWidget from './RecommendWidget';
import LabelsWidget from './LabelsWidget';

interface ISidebarProps {
  dataSource: {
    recommend?: IGithubIssues;
    labels?: IGithubLabels;
  };
}

const Sidebar: React.SFC<ISidebarProps> = (props) => {
  const { recommend, labels } = props.dataSource;

  return (
    <div>
      {recommend && <RecommendWidget recommend={recommend} />}
      {labels && <LabelsWidget labels={labels} />}
    </div>
  );
};

export default Sidebar;
