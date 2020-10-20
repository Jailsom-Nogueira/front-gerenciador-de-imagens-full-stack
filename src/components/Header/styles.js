import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      color: '#fff',
    },
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
