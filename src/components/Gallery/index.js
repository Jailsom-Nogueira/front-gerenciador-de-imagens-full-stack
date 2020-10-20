import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { useStyles, GalleryContainer, GalleryCard } from './styles';

import ImageDetails from '../ImageDetails';
import Loader from '../Loading';
import FormCollection from '../FormCollection';

import {
  ButtonBase,
  Typography,
  Button,
  CardActions,
  Modal,
  Avatar,
  Dialog,
} from '@material-ui/core';

import PermMediaIcon from '@material-ui/icons/PermMedia';

export default function CreateImage() {
  const allContext = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [openFormCollection, setOpenFormCollection] = useState(false);
  const [myGallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const history = useHistory();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
    getImages();
  }, [history, token]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const getImages = async () => {
    if (token !== null) {
      try {
        const response = await axios.get(
          `${baseUrl}image/getImage`,
          axiosConfig,
        );
        setGallery(response.data);
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

  const handleDelete = () => {
    let r = window.confirm('Tem certeza de que deseja apagar a imagem?');

    if (r === true) {
      axios
        .delete(
          `${baseUrl}image/deleteImage?id=${allContext.imageDetailsId}`,
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
  const handleClickOpen = () => {
    setOpenFormCollection(true);
  };

  const handleClickClose = () => {
    setOpenFormCollection(false);
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
  };

  const modalBody = <ImageDetails handleDelete={handleDelete} />;

  const loadingState = loading ? (
    <Loader />
  ) : (
    <>
      <Avatar className={classes.avatarStyle}>
        <PermMediaIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        GALERIA
      </Typography>

      <GalleryCard>
        <div className={classes.root}>
          {myGallery.map((image) => (
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

        <CardActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoBackButton}
          >
            VOLTAR
          </Button>
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            CRIAR COLEÇÃO
          </Button>
        </CardActions>
      </GalleryCard>
    </>
  );

  return (
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

      <div>
        <Dialog
          open={openFormCollection}
          onClose={handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <FormCollection handleClickClose={handleClickClose} />
        </Dialog>
      </div>
    </GalleryContainer>
  );
}
