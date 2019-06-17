import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

interface IPostHeaderProps {
  data: {
    slug: string;
    title: string;
    created_at: string;
    tags: string[];
  };
  excerpt?: boolean;
}

interface ITitleProps {
  excerpt: boolean | undefined;
}

// tslint:disable-next-line
const Title = styled.h1<ITitleProps>`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${themeColor};
  font-size: 1.85rem;
  cursor: ${(props) => (props.excerpt ? 'pointer' : 'initial')};
`;

const Meta = styled.div`
  margin-bottom: 1rem;
  color: #7a7a7a;
  font-size: 14px;
`;

const DateTime = styled.time`
  margin-right: 10px;
`;

const TagLink = styled.a`
  box-shadow: none;
  margin-right: 7px;
  cursor: pointer;
`;

const PostHeader: React.SFC<IPostHeaderProps> = (props) => {
  const { data, excerpt } = props;
  const { slug, title, created_at, tags } = data;
  return (
    <div>
      <Link href={`/posts/${slug}`} as={`/posts/${slug}`}>
        <Title excerpt={excerpt}>{title}</Title>
      </Link>
      <Meta>
        <DateTime>{format(created_at, 'YYYY年MM月DD日')}</DateTime>
        {tags.map((tag) => (
          <TagLink key={tag}>#{tag}</TagLink>
        ))}
      </Meta>
    </div>
  );
};

export default PostHeader;
