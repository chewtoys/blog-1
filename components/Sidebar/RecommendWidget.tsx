import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styled from 'styled-components';

import Card from '../Card';
import { themeColor } from '../../config.json';

interface IRecommendWidgetProps {
  recommend: IGithubIssues;
}

const Item = styled.div`
  & + & {
    margin-top: 0.85rem;
  }
`;

const DateTime = styled.time`
  display: block;
  margin-bottom: 5px;
  color: #7a7a7a;
  font-size: 0.85em;
  line-height: 1rem;
`;

const Title = styled.span`
  color: #242424;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    color: ${themeColor};
  }
`;

const RecommendWidget: React.SFC<IRecommendWidgetProps> = (props) => {
  const { recommend } = props;

  return (
    <Card title="热门推荐">
      {recommend.nodes.map((node: IGithubIssue) => {
        const { number: id, title, createdAt } = node;

        return (
          <Item key={id}>
            <Link prefetch href={`/post?id=${id}`} as={`/post/${id}`}>
              <div>
                <DateTime>{format(createdAt, 'YYYY年MM月DD日')}</DateTime>
                <Title>{title}</Title>
              </div>
            </Link>
          </Item>
        );
      })}
    </Card>
  );
};

export default RecommendWidget;
