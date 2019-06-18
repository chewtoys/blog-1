import * as React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

interface ILoadMoreProps {
  loading: boolean;
  onClick: () => Promise<void>;
}

const More = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${themeColor};
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1);
  cursor: pointer;
`;

const Loader = styled(({ className }) => (
  <div className={className}>
    <BeatLoader size={10} color={themeColor} />
  </div>
))`
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
`;

const LoadMore: React.SFC<ILoadMoreProps> = (props) => {
  if (props.loading) {
    return <Loader />;
  }

  return <More onClick={props.onClick}>加载更多</More>;
};

export default LoadMore;