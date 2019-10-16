import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styled from 'styled-components';

import Section from '../Section';
import { getConfig } from '../../utils';

const { theme } = getConfig();

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
  color: #757575;
  font-size: 0.85em;
  line-height: 1rem;
`;

const Title = styled.span`
  color: #242424;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${theme.color};
  }
`;

const RecommendWidget: React.SFC<IRecommendWidgetProps> = (props) => {
  const { recommend } = props;

  return (
    <Section title="热门推荐">
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
    </Section>
  );
};

export default RecommendWidget;
