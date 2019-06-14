import * as React from 'react';
import _ from 'lodash/fp';
import Markdown from 'react-markdown';

import CodeRender from './CodeRender';
import BlockquteRender from './BlockquteRender';
import ImageRender from './ImageRender';

interface PostContentProps {
  body: string;
  excerpt?: boolean;
}

const markdownRenderers = {
  code: CodeRender,
  blockquote: BlockquteRender,
  image: ImageRender,
};

const excerptSeparator = '<!--more-->';
// getMarkdownExcerpt : string -> string
const getMarkdownExcerpt = _.compose(
  _.first,
  _.split(excerptSeparator),
);
// removeExcerptSeparator : string -> string
const removeExcerptSeparator = _.replace(excerptSeparator, '');

const PostContent: React.SFC<PostContentProps> = (props) => {
  const { body, excerpt } = props;
  const source = excerpt ? getMarkdownExcerpt(body) : removeExcerptSeparator(body);

  return (
    <div>
      <Markdown
        source={source}
        renderers={markdownRenderers}
      />
    </div>
  );
};

PostContent.defaultProps = {
  excerpt: false,
};

export default PostContent;
