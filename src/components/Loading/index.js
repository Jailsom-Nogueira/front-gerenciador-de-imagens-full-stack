import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;

const Image = styled.img`
  width: 5vw;
`;

export default function Loader() {
  return (
    <Rotate>
      <Image src={require('../../assets/images/loader.png')} />
    </Rotate>
  );
}
