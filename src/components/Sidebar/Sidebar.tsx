import * as React from 'react';
import styled from 'styled-components';

import RecommendWidget from './RecommendWidget';
import LabelsWidget from './LabelsWidget';

interface ISidebarProps {
  dataSource: {
    recommend?: IGithubIssues;
    labels?: IGithubLabels;
  };
}

const Wrapper = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

const Sidebar: React.SFC<ISidebarProps> = (props) => {
  const { recommend, labels } = props.dataSource;

  return (
    <Wrapper>
      {recommend && <RecommendWidget recommend={recommend} />}
      {labels && <LabelsWidget labels={labels} />}
    </Wrapper>
  );
};

export default Sidebar;
