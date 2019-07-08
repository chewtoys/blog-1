import * as React from 'react';
import { getYear } from 'date-fns';
import styled from 'styled-components';

import Container from '../Container';
import Logo from '../Logo';
import { author, since, themeColor } from '../../config.json';

const Wrapper = styled.footer`
  padding: 30px 0 40px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const Copyright = styled.p`
  margin: 0;
  padding-left: 5px;
  color: #8c8c8c;
  font-size: 0.85rem;
`;

const SitePV = styled.span`
  padding-left: 5px;
  color: #8c8c8c;
  font-size: 0.75rem;
`;

const Count = styled.span`
  margin: 0 3px;
`;

const Link = styled.a`
  color: inherit;
  border-bottom: 1px dotted;
  box-shadow: none;

  &:hover {
    color: ${themeColor};
    border-bottom: none;
  }
`;

const Footer: React.SFC = (_, ref) => {
  const currentYear = getYear(Date.now());

  return (
    <Wrapper ref={ref}>
      <Container>
        <Logo />
        <Copyright>
          &copy; {since} - {currentYear} {author} Power By{' '}
          <Link href="https://nextjs.org/">Next.js</Link> &{' '}
          <Link href="https://zeit.co/now">Now</Link>
        </Copyright>
        <SitePV id="busuanzi_container_site_pv" style={{ display: 'none' }}>
          本站总访问量
          <Count id="busuanzi_value_site_pv" />
          次， 本站访客数
          <Count id="busuanzi_value_site_uv" />人次
        </SitePV>
      </Container>
    </Wrapper>
  );
};

export default React.forwardRef(Footer);
