import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const MediaContainer = styled(Container)`
  overflow: hidden;
  padding: 0 50px;

  @media (max-width: 576px) {
    paddingTop: 0;
  }
  @media (max-width: 992px) {
    padding: 0 20px;
  }
`;

export default MediaContainer;
