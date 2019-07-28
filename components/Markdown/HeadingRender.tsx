import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash/fp';

interface IHeadingRenderProps {
  level: number;
  children: ArrayLike<React.ReactNode>;
}

const Heading = styled(({ className, level, children, id }) => {
  const H = `h${level}` as React.ElementType;
  return <H className={className} id={id}>{children}</H>;
})`
  a {
    display: none;
    box-shadow: none;
  }

  &:hover {
    a {
      display: inline;
    }
  }
`;

const HeadingRender: React.SFC<IHeadingRenderProps> = (props) => {
  const { level, children } = props;
  const id = _.get('props.children', _.first(children));

  return (
    <Heading level={level} id={id}>
      {children}
      <a href={`#${id}`}>#</a>
    </Heading>
  );
};

export default HeadingRender;
