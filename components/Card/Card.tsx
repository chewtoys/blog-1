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
  margin-top: 1rem;
  padding: ${(props) => props.padding || '1.5rem'};
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
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
