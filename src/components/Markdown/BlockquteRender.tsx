import * as React from 'react';
import styled from 'styled-components';

import { getConfig } from '../../utils';

const { theme } = getConfig();

const StyledBlockqute = styled.blockquote`
  margin: 1.25rem 0;
  padding: 1rem 1.5rem;
  background: #fafafa;
  font-size: 1rem;
  border-left: 3px solid ${theme.color};
`;

const BlockquteRender: React.SFC = (props) => {
  return (
    <StyledBlockqute>
      {props.children}
    </StyledBlockqute>
  );
};

export default BlockquteRender;
