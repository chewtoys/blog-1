import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import { getConfig } from '../../utils';

interface ILoadingProps {
  loading: boolean;
  visiable: boolean;
  onClick: () => void;
}

const { theme } = getConfig();

const Wrapper = styled.div`
  min-height: 60px;
  margin-top: 10px;
  padding-top: 1.25rem;
  text-align: center;
`;

const Loader = styled(({ className, ...props }) => (
  <div className={className}>
    <BeatLoader {...props} />
  </div>
))`
  padding-top: 10px;
`;

const Button = styled.button`
  width: 100%;
  display: block;
  color: ${theme.color};
  background-color: #fff;
  border: none;
  outline: none;
  padding: 10px;
  border: 1px solid ${theme.color};
  border-radius: 5px;
  transition: all ease-out 0.3s;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #fff;
    background-color: ${theme.color};
  }
`;

const LoadMore: React.SFC<ILoadingProps> = (props) => {
  const { loading, visiable, onClick } = props;

  if (!visiable) {
    return null;
  }

  return (
    <Wrapper>
      {loading ? (
        <Loader color={theme.color} size={10} />
      ) : (
        <Button onClick={onClick}>加载更多...</Button>
      )}
    </Wrapper>
  );
};

export default LoadMore;
