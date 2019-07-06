import * as React from 'react';
import styled from 'styled-components';
import useWindowScroll from 'react-use/lib/useWindowScroll';

import Logo from '../Logo';
import Navbar from './Navbar';
import Container from '../Container';
import useRouteChange from '../../hooks/useRouteChange';

interface IHeaderProps {
  height?: number;
}

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

const Header: React.SFC<IHeaderProps> = (_, ref) => {
  const lastY = React.useRef(0);
  const [visible, setVisible] = React.useState(true);

  useRouteChange(() => lastY.current = 0);

  const { y } = useWindowScroll();
  React.useEffect(() => {
    const height = ref.current.offsetHeight;
    const outrideHeader = y < height;
    const isScrollUp = y < lastY.current;

    setVisible(outrideHeader || isScrollUp);
    lastY.current = y;
  }, [y, ref]);

  return (
    <Wrapper visible={visible} ref={ref}>
      <Container>
        <Logo padding="18px 0" />
        <Navbar />
      </Container>
    </Wrapper>
  );
};

export default React.forwardRef(Header);
