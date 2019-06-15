import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styled from 'styled-components';

import Card from '../Card';
import PageContext from '../../lib/context';
import { themeColor } from '../../config.json';

const PostItem = styled.div`
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
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: ${themeColor};
  }
`;

const RecentWidget: React.SFC = () => {
  const pageContext = React.useContext(PageContext);
  const { recent } = pageContext as PageContextValue;

  return (
    <Card title="最新文章">
      {recent.map((post: BlogPost) => {
        const { slug, title, created_at } = post;

        return (
          <PostItem key={slug}>
            <Link href={`/posts?slug=${slug}`} as={`/posts/${slug}`}>
              <div>
                <DateTime>{format(created_at, 'YYYY年MM月DD日')}</DateTime>
                <Title>{title}</Title>
              </div>
            </Link>
          </PostItem>
        );
      })}
    </Card>
  );
};

export default RecentWidget;
