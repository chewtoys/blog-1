import * as React from 'react';
import styled from 'styled-components';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import SEO from '../SEO';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import useAnalytics from '../../hooks/useAnalytics';

interface IMainProps {
  minHeight: string;
}

const Main = styled.main<IMainProps>`
  min-height: ${(props) => props.minHeight};
  margin-top: 70px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const Layout: React.SFC = (props) => {
  const [minHeight, setMinHeight] = React.useState('auto');
  const headerRef: React.Ref<HTMLElement> = React.createRef();
  const footerRef: React.Ref<HTMLDivElement> = React.createRef();

  React.useEffect(() => {
    const headerHeight = headerRef.current!.offsetHeight;
    const footerHeight = footerRef.current!.offsetHeight;
    if (headerHeight && footerHeight) {
      setMinHeight(`calc(100vh - ${headerHeight}px - ${footerHeight}px)`);
    }
  }, [headerRef, footerRef]);

  useAnalytics();

  return (
    <>
      <SEO />
      <Header ref={headerRef} />
      <Main minHeight={minHeight}>
        <Container>{props.children}</Container>
      </Main>
      <Footer ref={footerRef} />
    </>
  );
};

export default Layout;
