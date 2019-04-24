import * as React from 'react';

export type IPostContext = IMarkdownRemarkNode & {
  link: string;
  simple: boolean;
}

const PostContext = React.createContext({});

export default PostContext;
