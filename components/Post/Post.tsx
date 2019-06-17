import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Card from '../Card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { themeColor } from '../../config.json';

interface IPostProps {
  data: IBlogPost;
  excerpt?: boolean;
}

const ReadMore = styled.span`
  font-size: 0.9rem;
  color: ${themeColor};
`;

const Post: React.SFC<IPostProps> = (props) => {
  const { data, excerpt } = props;
  const { slug, body } = data;

  return (
    <Card>
      <PostHeader {...props} />
      <PostContent body={body} excerpt={excerpt} />
      {excerpt ? (
        <Link href={`/posts/${slug}`} as={`/posts/${slug}`}>
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
