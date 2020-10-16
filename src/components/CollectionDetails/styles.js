import styled from 'styled-components';

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b1d20;
`;
export const GalleryCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80vw;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.3);
  background-color: #fff;

  @media (max-width: 1048px) {
    width: 80vw;
  }

  @media (max-width: 800px) {
    width: 80vw;
  } ;
`;
