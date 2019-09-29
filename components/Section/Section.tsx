import * as React from 'react';
import styled from 'styled-components';

interface ISectionProps {
  title?: string;
  padding?: string;
}

interface IWrapperProps {
  padding?: string;
}

// tslint:disable-next-line
const Wrapper = styled.section<IWrapperProps>`
  margin-top: 10px;
  padding: ${(props) => props.padding || '1.5rem 0 1rem'};
  background: #fff;

  & + & {
    border-top: 1px solid #e9e9e9;
  }
`;

const Title = styled.h3`
  margin: 0 0 15px;
  color: #757575;
  font-size: 1em;
  font-weight: 400;
`;

const Section: React.SFC<ISectionProps> = (props) => {
  const { title, padding, children } = props;

  return (
    <Wrapper padding={padding}>
      {title && <Title>{title}</Title>}
      <div>{children}</div>
    </Wrapper>
  );
};

export default Section;
