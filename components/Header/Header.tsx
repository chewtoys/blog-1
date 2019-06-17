import * as React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import Container from '../Container';
import useWindowScroll from '../../hooks/useWindowScroll';

interface IWrapperProps {
  readonly visible: boolean;
}

// tslint:disable-next-line
const Wrapper = styled.header<IWrapperProps>`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  transition: opacity ease-out 0.3s;
  overflow: hidden;
  z-index: 666;
`;

let headerHeight: number = 0;

const Header: React.SFC = () => {
  const [visible, setVisible] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const headerRef = React.createRef<HTMLDivElement>();

  useWindowScroll(() => {
    const { scrollTop } = document.documentElement;
    if (headerHeight === 0 && headerRef.current) {
      headerHeight = headerRef.current.offsetHeight / 2;
    }

    const outrideHeader = scrollTop < headerHeight;
    const isScrollUp = scrollTop < lastScrollTop;
    setVisible(outrideHeader || isScrollUp);
    setLastScrollTop(scrollTop);
  });

  return (
    <Wrapper visible={visible} ref={headerRef}>
      <Container>
        <Logo />
      </Container>
    </Wrapper>
  );
};

export default Header;
