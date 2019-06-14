import * as React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface ImageRenderProps {
  alt: string;
  src: string;
}

const ImageRender: React.SFC<ImageRenderProps> = (props) => {
  const { alt, src } = props;
  const [show, setShow] = React.useState(false);

  return (
    <>
      <img src={src} alt={alt} onClick={() => setShow(true)} />
      {show && <Lightbox mainSrc={src} onCloseRequest={() => setShow(false)} />}
    </>
  );
};

export default ImageRender;
