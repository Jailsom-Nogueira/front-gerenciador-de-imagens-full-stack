import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import * as dayjs from 'dayjs';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { useStyles, GalleryContainer, GalleryCard } from './styles';

import Loader from '../Loading';
import ImagesToAdd from '../ImagesToAdd';
import ImageDetails from '../ImageDetails';

import {
  ButtonBase,
  Typography,
  Button,
  CardActions,
  Avatar,
  Modal,
} from '@material-ui/core';

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

export default function CollectionDetails() {
  const allContext = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

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
          `${baseUrl}collection/getCollectionDetails?id=${params.collectionId}`,
          axiosConfig,
        );

        allContext.setMyCollections(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err.message);
        history.goBack();
      }
    } else {
      history.push('/');
    }
  };

  const handleAddImage = (imageId) => {
    setLoading(true);
    const body = {
      collectionId: `${params.collectionId}`,
      imageId: `${imageId}`,
      date: `${dayjs().format('YYYY-MM-DD')}`,
    };

    axios
      .post(`${baseUrl}collectionsImages/addImage`, body, axiosConfig)
      .then((response) => {
        alert(response.data.message);
        getCollections();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const handleDeleteFromCollection = () => {
    let r = window.confirm('Tem certeza de que deseja apagar a imagem?');

    if (r === true) {
      axios
        .delete(
          `${baseUrl}collectionsImages/deleteFromCollection?collectionId=${params.collectionId}&imageId=${allContext.imageDetailsId}`,
          axiosConfig,
        )
        .then(() => {
          allContext.setImageDetailsId('');
          setOpen(false);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleGoBackButton = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleOpen = (imageId) => {
    allContext.setImageDetailsId(imageId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    allContext.setImageDetailsId('');
  };

  const modalBody = (
    <ImageDetails handleDeleteFromCollection={handleDeleteFromCollection} />
  );

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
        {allContext.collectionTittle.toUpperCase()}
      </Typography>

      <GalleryCard>
        {!allContext.myCollections.length ? (
          <p>Esta lista está vazia, comece adicionando algumas imagens a ela</p>
        ) : (
          <>
            <div className={classes.root}>
              {allContext.myCollections.map((image) => (
                <ButtonBase
                  focusRipple
                  key={image.id}
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: '33%',
                  }}
                  onClick={() => handleOpen(image.id)}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.file})`,
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
                      {image.subtitle}
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
              ))}
            </div>
          </>
        )}

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

  return (
    <>
      <GalleryContainer>
        {loadingState}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="detalhes-da-imagem"
          aria-describedby="quando-selecionado-abre-detalhes-da-imagem"
          className={classes.modal}
        >
          {modalBody}
        </Modal>
      </GalleryContainer>
      <GalleryContainer>
        <ImagesToAdd handleAddImage={handleAddImage} />
      </GalleryContainer>
      ;
    </>
  );
}
