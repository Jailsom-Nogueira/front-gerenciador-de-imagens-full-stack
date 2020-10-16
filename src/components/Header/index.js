import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    history.push('/');
  };

  const goToCollections = (event) => {
    event.preventDefault();
    history.push('/Collections');
  };

  const goToGallery = (event) => {
    event.preventDefault();
    history.push('/Gallery');
  };

  const goToCreateImage = (event) => {
    event.preventDefault();
    history.push('/CreateImage');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Gallery
          </Typography>
          <Button color="inherit" onClick={goToCreateImage}>
            Criar imagem
          </Button>
          <Button color="inherit" onClick={goToGallery}>
            Galeria
          </Button>
          <Button color="inherit" onClick={goToCollections}>
            Coleções
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
