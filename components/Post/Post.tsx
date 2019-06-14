import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { themeColor } from '../../config.json';

interface PostProps {
  data: BlogPost;
  excerpt?: boolean;
}

const Card = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);

  & + & {
    margin-top: 1.5rem;
  }
`;

const ReadMore = styled.span`
  color: ${themeColor};
`;

const Post: React.SFC<PostProps> = (props) => {
  const { data, excerpt } = props;
  const { slug, title, tags, body, created_at } = data;

  return (
    <Card>
      <PostHeader title={title} createdAt={created_at} tags={tags} />
      <PostContent body={body} excerpt={excerpt} />
      {excerpt ? (
        <Link href={`/posts/${slug}`} prefetch>
          <ReadMore>阅读更多...</ReadMore>
        </Link>
      ) : (
        <div>footer</div>
      )}
    </Card>
  );
};

Post.defaultProps = {
  excerpt: false,
};

export default Post;
