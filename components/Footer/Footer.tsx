import * as React from 'react';
import { getYear } from 'date-fns';
import styled from 'styled-components';

import Container from '../Container';
import { author, since } from '../../config.json';

const Wrapper = styled.footer`
  padding: 30px 0;
  text-align: center;
  color: #8C8C8C;
  font-size: 0.9rem;
  background-color: rgba(0, 0, 0, 0.03);
`;

const Footer: React.SFC = () => {
  const currentYear = getYear(Date.now());

  return (
    <Wrapper>
      <Container>
        <span>
          Copyright &copy; {since} - {currentYear} @{author}
        </span>
      </Container>
    </Wrapper>
  );
};

export default Footer;
