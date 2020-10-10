import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import axios from 'axios';
import { baseUrl, axiosConfig } from '../../constants/axios';

import { GalleryContainer, GalleryCard } from './styles';

import ImageDetails from '../ImageDetails';
import Loader from '../Loading';

import {
  makeStyles,
  ButtonBase,
  Typography,
  Button,
  CardActions,
  Modal,
  Avatar,
} from '@material-ui/core';

import PermMediaIcon from '@material-ui/icons/PermMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
}));

export default function CreateImage() {
  const allContext = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
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
        MINHA GALERIA
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
    </GalleryContainer>
  );
}
