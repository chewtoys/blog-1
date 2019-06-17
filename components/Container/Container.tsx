import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const MediaContainer = styled(Container)`
  padding: 0;

  @media (max-width: 1440px) {
    padding: 0 70px;
  }

  @media (max-width: 1200px) {
    padding: 0 30px;
  }

  @media (max-width: 992px) {
    padding: 0 20px;
  }

  @media (max-width: 576px) {
    paddingTop: 0;
  }
`;

export default MediaContainer;
