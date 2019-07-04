import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

interface ILoadingProps {
  loading: boolean;
  visiable: boolean;
  onClick: () => void;
}

const Wrapper = styled.div`
  min-height: 60px;
  margin-top: 10px;
  padding-top: 1.25rem;
  text-align: center;
`;

const Loader = styled(BeatLoader)`
  padding-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  display: block;
  color: ${themeColor};
  background-color: #fff;
  border: none;
  outline: none;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
`;

const LoadMore: React.SFC<ILoadingProps> = (props) => {
  const { loading, visiable, onClick } = props;

  if (!visiable) {
    return null;
  }

  return (
    <Wrapper>
      {loading ? (
        <Loader color={themeColor} size={10} />
      ) : (
        <Button onClick={onClick}>加载更多...</Button>
      )}
    </Wrapper>
  );
};

export default LoadMore;
