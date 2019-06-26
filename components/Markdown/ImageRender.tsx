import * as React from 'react';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface IImageRenderProps {
  alt: string;
  src: string;
}

const Wrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
  max-height: 500px;
`;

const ImageRender: React.SFC<IImageRenderProps> = (props) => {
  const { alt, src } = props;
  const [show, setShow] = React.useState(false);

  return (
    <Wrapper>
      <Image src={src} alt={alt} onClick={() => setShow(true)} />
      {show && <Lightbox mainSrc={src} onCloseRequest={() => setShow(false)} />}
    </Wrapper>
  );
};

export default ImageRender;
