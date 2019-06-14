import * as React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

interface PostHeaderProps {
  title: string;
  createdAt: string;
  tags: string[];
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${themeColor};
  font-size: 2rem;
`;

const Meta = styled.div`
  margin-bottom: 1rem;
  color: #b2bac2;
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

const PostHeader: React.SFC<PostHeaderProps> = (props) => {
  const { title, createdAt, tags } = props;
  return (
    <div>
      <Title>{title}</Title>
      <Meta>
        <DateTime>{format(createdAt, 'YYYY年MM月DD日')}</DateTime>
        {tags.map((tag) => (
          <TagLink key={tag}>
            #{tag}
          </TagLink>
        ))}
      </Meta>
    </div>
  )
};

export default PostHeader;
