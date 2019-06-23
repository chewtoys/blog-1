import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import { themeColor } from '../../config.json';

interface ILoadingProps {
  visiable: boolean;
}

const Wrapper = styled.div`
  margin-top: 1.25rem;
  text-align: center;
`;

const Loading: React.SFC<ILoadingProps> = (props) => {
  const { visiable } = props;

  return (
    <Wrapper>
      {visiable &&  (
        <BeatLoader color={themeColor} size={10} />
      )}
    </Wrapper>
  );
};

export default Loading;
