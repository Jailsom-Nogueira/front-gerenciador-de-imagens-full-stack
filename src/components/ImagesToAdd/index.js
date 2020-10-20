import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { useStyles, GalleryContainer, GalleryCard } from './styles';

import { ButtonBase, Typography, Avatar } from '@material-ui/core';

import PermMediaIcon from '@material-ui/icons/PermMedia';

export default function ImagesToAdd(props) {
  const allContext = useContext(GlobalContext);

  const [myGallery, setGallery] = useState([]);

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
      } catch (err) {
        alert('Erro ao estabelecer conexão com o banco de dados', err.message);
        history.goBack();
      }
    } else {
      history.push('/');
    }
  };

  const filterResult = myGallery.filter(
    ({ id: id1 }) =>
      !allContext.myCollections.some(({ id: id2 }) => id2 === id1),
  );

  const gotImagesToShow = filterResult.length ? (
    <>
      <Avatar className={classes.avatarStyle}>
        <PermMediaIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        SELECIONE ABAIXO AS IMAGENS QUE DESEJA ADICIONAR
      </Typography>

      <GalleryCard>
        <div className={classes.root}>
          {filterResult.map((image) => (
            <ButtonBase
              focusRipple
              key={image.id}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '33%',
              }}
              onClick={() => props.handleAddImage(image.id)}
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
      </GalleryCard>
    </>
  ) : (
    <>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        VOCÊ JÁ ADICIONOU TODAS AS IMAGENS
      </Typography>
    </>
  );

  return <GalleryContainer>{gotImagesToShow}</GalleryContainer>;
}
