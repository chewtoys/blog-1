import * as React from 'react';
import _ from 'lodash/fp';
import styled from 'styled-components';

import Card from '../Card';
import PageContext from '../../lib/context';
import { themeColor } from '../../config.json';

const Tags = styled.div`
  overflow: auto;
`;

const Tag = styled.span`
  float: left;
  color: #242424;
  font-size: 0.9rem;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    color: ${themeColor};
  }
`;

const TagsWidget: React.SFC = () => {
  const pageContext = React.useContext(PageContext);
  const { tags } = pageContext as IPageContextValue;

  return (
    <Card title="标签">
      <Tags>
        {_.shuffle(tags).map((tag) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </Tags>
    </Card>
  );
};

export default TagsWidget;
