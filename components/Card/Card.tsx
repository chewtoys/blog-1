import * as React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
}

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);

  & + & {
    margin-top: 1.5rem;
  }
`;

const Title = styled.h3`
  margin: 0 0 15px;
  font-size: 1em;
  font-weight: 200;
`;

const Content = styled.div`
  overflow: auto;
`;

const Card: React.SFC<CardProps> = (props) => {
  const { title, children } = props;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default Card;
