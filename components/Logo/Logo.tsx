import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import config from '../../config.json';

const Wrapper = styled.div`
  display: inline-block;
  padding: 23px 0;
  cursor: pointer;
`;

const Icon = styled.img`
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 7px;
  width: 25px;
  height: 25px;
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
      <Link href="/" prefetch>
        <span>
          <Icon src={config.icon} alt={config.title} />
          <Title>{config.title}</Title>
        </span>
      </Link>
    </Wrapper>
  );
};

export default Logo;
