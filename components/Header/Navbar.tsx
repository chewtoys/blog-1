import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { menu, themeColor } from '../../config.json';

const Nav = styled.nav`
  float: right;
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: inline;
  line-height: 60px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: ${themeColor};
  }
`;

const Navbar: React.SFC = () => {
  return (
    <Nav>
      <List>
        {menu.map(({ name, url }) => (
          <Link href={url}>
            <Item>{name}</Item>
          </Link>
        ))}
      </List>
    </Nav>
  );
};

export default Navbar;
