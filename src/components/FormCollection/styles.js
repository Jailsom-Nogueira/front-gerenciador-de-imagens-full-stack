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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  input: {
    display: 'none',
  },
  buttonuUploadStyle: {
    color: '#fff',
    width: '100%',
  },
}));
