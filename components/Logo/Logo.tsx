import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import config from '../../config.json';

const Wrapper = styled.div`
  display: inline-block;
  padding: 18px 0;
  cursor: pointer;
`;

const Icon = styled.img`
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0 5px;
  width: 20px;
  height: 20px;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  color: #333;
  font-size: 20px;
  text-transform: uppercase;
`;

const Logo: React.SFC = () => {
  return (
    <Wrapper>
      <Link prefetch href="/">
        <Title>
          <Icon src={config.icon} alt={config.title} />
          <span>{config.title}</span>
        </Title>
      </Link>
    </Wrapper>
  );
};

export default Logo;
