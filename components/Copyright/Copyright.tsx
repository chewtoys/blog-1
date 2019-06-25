import * as React from 'react';
import getYear from 'date-fns/get_year';
import styled from 'styled-components';

import Card from '../Card';
import { since, author, license, themeColor } from '../../config.json';

const Text = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #8c8c8c;
`;

const Link = styled.a`
  color: inherit;
  border-bottom: 1px dotted;
  box-shadow: none;

  &:hover {
    color: ${themeColor};
  }
`;

const License = styled.img`
  height: 25px;
  margin-top: 5px;
`;

const Copyright: React.SFC = () => {
  const currentYear = getYear(Date.now());

  return (
    <Card padding="1rem 0">
      <Text>
        Copyright &copy; {since} - {currentYear} · {author}
      </Text>
      <Text>
        Power By{' '}
        <Link href="https://nextjs.org/" target="__blank">
          Next.js
        </Link>{' '}
        & Deploy With{' '}
        <Link href="https://zeit.co/now" target="__blank">
          Now
        </Link>
      </Text>
      <License src={license} alt="license" />
    </Card>
  );
};

export default Copyright;
