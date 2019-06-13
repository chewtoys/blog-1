import * as React from 'react';
import MarkdownIt from 'markdown-it';
import excerptHtml from 'excerpt-html';

interface PostContentProps {
  markdown: string;
  excerpt: boolean;
}

const PostContent: React.SFC<PostContentProps> = (props) => {
  const mdt = new MarkdownIt();
  const html = mdt.render(props.markdown);

  if (props.excerpt) {
    const text = excerptHtml(html);
    console.log(text);
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
};

export default PostContent;
