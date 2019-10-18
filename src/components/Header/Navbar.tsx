import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { getConfig } from '../../utils';

const { theme, menu } = getConfig();

const Nav = styled.nav`
  float: right;
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: inline;
  line-height: 60px;
  cursor: pointer;

  & + & {
    margin-left: 15px;
  }

  &:hover {
    color: ${theme.color};
  }
`;

const Navbar: React.SFC = () => {
  return (
    <Nav>
      <List>
        {(menu || []).map(({ name, url }) => (
          <Link href={url} key={name}>
            <Item>{name}</Item>
          </Link>
        ))}
      </List>
    </Nav>
  );
};

export default Navbar;
