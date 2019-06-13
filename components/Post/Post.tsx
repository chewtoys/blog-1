import * as React from 'react';

import PostContent from './PostContent';

interface PostProps {
  data: BlogPost;
  excerpt: boolean;
}

const Post: React.SFC<PostProps> = (props) => {
  const { title, body } = props.data;

  return (
    <article>
      <h2>{title}</h2>
      <PostContent markdown={body} excerpt={props.excerpt} />
    </article>
  );
};

Post.defaultProps = {
  excerpt: false,
};

export default Post;
