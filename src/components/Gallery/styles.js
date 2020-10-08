import styled from 'styled-components';

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
`;
