import * as React from 'react';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

const StyledBlockqute = styled.blockquote`
  margin: 1.25rem -1.5rem;
  padding: 1rem 1.5rem;
  background: #fafafa;
  font-size: 1rem;
  border-left: 3px solid ${themeColor};
`;

const BlockquteRender: React.SFC = (props) => {
  return (
    <StyledBlockqute>
      {props.children}
    </StyledBlockqute>
  );
};

export default BlockquteRender;
