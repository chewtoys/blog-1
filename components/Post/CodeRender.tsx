import * as React from 'react';
import _ from 'lodash/fp';
import styled from 'styled-components';
import Highlight from 'react-highlight';

import 'highlight.js/styles/tomorrow.css';

interface ICodeRenderProps {
  inline: string;
  value: string;
  language?: string;
}

const InlineCode = styled.code`
  padding: 3px 5px;
  font-size: 0.9rem;
  background-color: #f5f2f0;
  border-radius: 5px;
`;

const CodeBlock = styled(Highlight)`
  position: relative;
  font-size: 0.9rem !important;
  line-height: 1.5rem;
  margin: 1.25rem -1.5rem !important;
  padding: 1rem 1.5rem !important;
  background-color: #f5f2f0;
`;

const Language = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.3;
  font-size: 0.85rem;
  padding: 0 7px;
  text-transform: uppercase;
`;

const CodeRender: React.SFC<ICodeRenderProps> = (props) => {
  if (props.inline) {
    return <InlineCode>{props.value}</InlineCode>;
  }

  const language = _.toLower(props.language || '');
  return (
    <CodeBlock className={language}>
      {props.value}
      <Language>{language}</Language>
    </CodeBlock>
  );
};

export default CodeRender;
