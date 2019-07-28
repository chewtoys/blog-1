import * as React from 'react';
import _ from 'lodash/fp';
import ReactMarkdown from 'react-markdown';

import HeadingRender from './HeadingRender.tsx';
import CodeRender from './CodeRender';
import BlockquteRender from './BlockquteRender';
import ImageRender from './ImageRender';
import ListItemRender from './ListItemRender';

interface IPostContentProps {
  source: string;
  excerpt?: boolean;
}

const markdownRenderers = {
  heading: HeadingRender,
  code: CodeRender,
  inlineCode: CodeRender,
  blockquote: BlockquteRender,
  image: ImageRender,
  listItem: ListItemRender,
};

const getMarkdownExcerptOrSource = (
  source: string,
  excerpt: boolean,
  separator: string = '<!--more-->',
) => {
  if (excerpt) {
    return _.first(_.split(separator, source));
  }
  return _.replace(separator, '', source);
};

const Markdown: React.SFC<IPostContentProps> = (props) => {
  const { source, excerpt = false } = props;

  return (
    <div>
      <ReactMarkdown
        source={getMarkdownExcerptOrSource(source, excerpt)}
        renderers={markdownRenderers}
      />
    </div>
  );
};

export default Markdown;
