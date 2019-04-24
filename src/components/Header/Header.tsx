import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Container } from 'react-bootstrap';
import withStyles, { WithSheet } from 'react-jss';
import _ from 'lodash/fp';

import Logo from '../Logo';
import Menu from './Menu';
import useWindowScroll from '../../hooks/useWindowScroll';
import { getDocumentScrollTop } from '../../utils/helpers';

const styles = (theme: any) => ({
  wrapper: {
    position: 'fixed',
    top: '0',
    height: '70px',
    width: '100%',
    opacity: '1',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
    transition: 'opacity ease-out .3s',
    overflow: 'hidden',
    zIndex: 9999,
  },
  hide: {
    opacity: '0',
  },
});

type IHeaderComponentProps = WithSheet<typeof styles> & {
  location: Location;
  metadata: ISiteMetadata;
};

let headerHeight: number = 0;

const Header = (props: IHeaderComponentProps) => {
  const { classes, location, metadata } = props;
  const { pathname } = location;
  const { title, menu } = metadata;

  const [hide, setHide] = React.useState(false);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const headerRef = React.createRef<HTMLDivElement>();

  useWindowScroll((event) => {
    const scrollTop = getDocumentScrollTop();
    if (!headerHeight) {
      headerHeight = headerRef.current.offsetHeight / 2;
    }

    const outrideHeader = scrollTop < headerHeight;
    const isScrollUp = scrollTop < lastScrollTop;

    setHide(!(outrideHeader || isScrollUp));
    setLastScrollTop(scrollTop);
  });

  const headerClassName = classnames(classes.wrapper, {
    [classes.hide]: hide,
  });

  return (
    <header className={headerClassName} ref={headerRef}>
      <Container>
        <Logo title={title} />
        <Menu items={menu} />
      </Container>
    </header>
  );
};

export default withStyles(styles)(Header);
