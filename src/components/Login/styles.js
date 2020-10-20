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
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(1),
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
  textValidator: {
    width: '100%',
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

  @media (max-width: 800px) {
    width: 80vw;
  } ;
`;
