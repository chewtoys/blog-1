import * as React from 'react';
import useSetState from 'react-use/lib/useSetState';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import styled from 'styled-components';

import Logo from '../Logo';
import Container from '../Container';
// import useWindowScroll from '../../hooks/useWindowScroll';

interface IHeaderProps {
  height?: number;
}

interface IWrapperProps {
  readonly visible: boolean;
  readonly height: number;
}

// tslint:disable-next-line
const Wrapper = styled.header<IWrapperProps>`
  position: fixed;
  top: 0;
  height: ${(props) => `${props.height}px`};
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  transition: opacity ease-out 0.3s;
  overflow: hidden;
  z-index: 666;
`;

const Header: React.SFC<IHeaderProps> = (props) => {
  const { height = 60 } = props;
  const [state, setState] = useSetState({ visible: true, lastScrollTop: 0 });
  const { visible, lastScrollTop } = state;

  const { y } = useWindowScroll();
  React.useEffect(() => {
    const outrideHeader = y < height;
    const isScrollUp = y < lastScrollTop;

    setState(() => ({
      visible: outrideHeader || isScrollUp,
      lastScrollTop: y,
    }));
  }, [y, height]);

  return (
    <Wrapper height={60} visible={visible}>
      <Container>
        <Logo />
      </Container>
    </Wrapper>
  );
};

export default Header;
