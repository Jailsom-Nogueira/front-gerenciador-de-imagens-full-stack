import styled from 'styled-components';

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  buttonStyle: {
    marginRight: theme.spacing(1),
    color: '#fff',
  },
  avatarStyle: {
    color: '#fff',
    backgroundColor: '#ff6d00',
    marginBottom: theme.spacing(1),
  },
  typographyStyle: {
    color: '#fff',
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  input: {
    display: 'none',
  },
}));

export const FormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1b1d20;
`;
export const FormPageCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.3);
  background-color: #fff;

  overflow: scroll auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ff6d00;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #ff6d00;
  }
  ::-webkit-scrollbar-track {
    background: #666666;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #666666;
  }
  ::-webkit-scrollbar-track:active {
    background: #333333;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  @media (max-width: 1024px) {
    width: 80vw;
  }

  @media (max-width: 800px) {
    width: 80vw;
  } ;
`;
export const ButtonContainer = styled.div`
  display: flex;
`;
