import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
}));

export default function CreateImage() {
  const classes = useStyles();
  return <></>;
}
