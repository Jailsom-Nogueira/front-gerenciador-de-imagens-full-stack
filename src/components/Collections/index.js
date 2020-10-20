import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { useStyles, GalleryContainer, GalleryCard } from './styles';

import Loader from '../Loading';

import {
  ButtonBase,
  Typography,
  Button,
  CardActions,
  Avatar,
} from '@material-ui/core';

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

export default function Collections() {
  const allContext = useContext(GlobalContext);

  const [myCollections, setMyCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const history = useHistory();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }

    getCollections();
  }, [history, token]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const getCollections = async () => {
    if (token !== null) {
      try {
        const response = await axios.get(
          `${baseUrl}collection/getAllCollections`,
          axiosConfig,
        );

        setMyCollections(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert('Erro ao estabelecer conexão com o banco de dados', err.message);
        history.goBack();
      }
    } else {
      history.push('/');
    }
  };

  const handleGoBackButton = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const goToCollection = (collectionId, collectionTitle) => {
    setLoading(false);
    history.push(`/ColletionDetails${collectionId}`);
    allContext.setCollectionTittle(collectionTitle);
  };

  const loadingState = loading ? (
    <Loader />
  ) : (
    <>
      <Avatar className={classes.avatarStyle}>
        <CollectionsBookmarkIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        MINHAS COLEÇÕES
      </Typography>

      <GalleryCard>
        <div className={classes.root}>
          {myCollections.map((collection) => (
            <ButtonBase
              focusRipple
              key={collection.id}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '33%',
              }}
              onClick={() => goToCollection(collection.id, collection.title)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${collection.file})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {collection.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>

        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoBackButton}
          >
            VOLTAR
          </Button>
        </CardActions>
      </GalleryCard>
    </>
  );

  return <GalleryContainer>{loadingState}</GalleryContainer>;
}
