import dynamic from 'next/dynamic';
import * as React from 'react';
import _ from 'lodash/fp';
import styled from 'styled-components';
// import Highlight from 'react-highlight';
import 'highlight.js/styles/tomorrow.css';

const Highlight = dynamic(() => import('react-highlight'));

interface ICodeRenderProps {
  inline: string;
  value: string;
  language?: string;
}

interface ICodeBlockProps {
  className: string;
  languages: string[];
}

const InlineCode = styled.code`
  padding: 3px 5px;
  font-size: 0.9rem;
  background-color: #f5f2f0;
  border-radius: 5px;
`;

const CodeBlock = styled(Highlight)<ICodeBlockProps>`
  display: block;
  font-size: 0.9rem !important;
  line-height: 1.5rem;
  margin: 1.25rem 0 !important;
  padding: 1rem 1.5rem !important;
  background-color: #f5f2f0;
  border-radius: 5px;
  word-break: normal;
  word-wrap: normal;
  white-space: pre;
`;

const CodeRender: React.SFC<ICodeRenderProps> = (props) => {
  if (props.inline) {
    return <InlineCode>{props.value}</InlineCode>;
  }

  const language = _.toLower(props.language || '');
  return (
    <CodeBlock className={language} languages={[language]}>
      {props.value}
    </CodeBlock>
  );
};

export default CodeRender;
