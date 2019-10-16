import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { getConfig } from '../../utils';

interface ILogoProps {
  padding?: string;
}

interface IWrapperProps {
  padding: string;
}

const { site: { title, icon } } = getConfig();

const Wrapper = styled.div<IWrapperProps>`
  display: inline-block;
  padding: ${(props) => props.padding};
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

const Logo: React.SFC<ILogoProps> = (props) => {
  const { padding = '0' } = props;

  return (
    <Wrapper padding={padding}>
      <Link prefetch href="/">
        <Title>
          <Icon src={icon} alt={title} />
          <span>{title}</span>
        </Title>
      </Link>
    </Wrapper>
  );
};

export default Logo;
