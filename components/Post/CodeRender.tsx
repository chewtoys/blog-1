import * as React from 'react';
import _ from 'lodash/fp';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface CodeRenderProps {
  language: string;
  value: string;
}

const StyledPre = styled.pre`
  font-size: 0.9rem !important;
  margin: 1.25rem -1.5rem !important;
  padding: 1rem 1.5rem !important;
`;

const CodeRender: React.SFC<CodeRenderProps> = (props) => {
  const language = _.toLower(props.language) || 'txt';
  const code = props.value;

  const grammar: Prism.Grammar | void = Prism.languages[language];
  const html = grammar ? Prism.highlight(code, grammar, language) : code;

  return (
    <StyledPre className={`language-${language}`}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </StyledPre>
  );
};

export default CodeRender;
