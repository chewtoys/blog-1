import * as React from 'react';
import styled from 'styled-components';

interface ICardProps {
  title?: string;
  padding?: string;
}

interface IWrapperProps {
  padding?: string;
}

// tslint:disable-next-line
const Wrapper = styled.div<IWrapperProps>`
  margin-top: 10px;
  padding: ${(props) => props.padding || '1.5rem 0'};
  border-bottom: 1px solid #e9e9e9;
`;

const Title = styled.h3`
  margin: 0 0 15px;
  font-size: 1em;
  font-weight: 200;
`;

const Card: React.SFC<ICardProps> = (props) => {
  const { title, padding, children } = props;

  return (
    <Wrapper padding={padding}>
      {title && <Title>{title}</Title>}
      <div>{children}</div>
    </Wrapper>
  );
};

export default Card;
