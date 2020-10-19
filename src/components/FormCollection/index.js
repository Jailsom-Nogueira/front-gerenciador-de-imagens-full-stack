import React, { useState } from 'react';

import * as dayjs from 'dayjs';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import {
  makeStyles,
  Button,
  TextField,
  DialogContent,
  Typography,
  FormControl,
  CardMedia,
  DialogActions,
} from '@material-ui/core';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
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
}));

export default function FormCollection(props) {
  const classes = useStyles();
  const token = window.localStorage.getItem('token');

  const [link, setLink] = useState();

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
  });
  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleCreateButton = (event) => {
    event.preventDefault();
    createImage();
  };

  const handleFile = async (event) => {
    try {
      const data = new FormData();
      data.append('file', event.target.files[0]);

      const res = await axios.put(`${baseUrl}files/upload`, data);
      setLink(res.data.link);
    } catch (err) {
      alert(err.message);
    }
  };

  const createImage = () => {
    const body = {
      title: `${form.title}`,
      subtitle: `${form.subtitle}`,
      date: `${dayjs().format('YYYY-MM-DD')}`,
      file: `${link}`,
    };

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    axios
      .put(`${baseUrl}collection/createCollection`, body, axiosConfig)
      .then((response) => {
        alert(response.data.message);
        setForm({ title: '', subtitle: '' });
        setLink();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <DialogContent>
      <Typography component="h3" variant="h5">
        CRIAR COLEÇÃO
      </Typography>

      <FormControl
        component="fieldset"
        className={classes.root}
        autoComplete="off"
      >
        {link && (
          <CardMedia
            className={classes.media}
            image={link}
            title={form.subtitle}
          />
        )}

        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Minha imagem
          </Button>
        </label>

        {/* <input type={'file'} onChange={handleFile} /> */}

        <TextField
          id="title"
          required
          label="Título"
          variant="outlined"
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          autoFocus
        />

        <TextField
          id="subtitle"
          required
          label="Subtítulo"
          variant="outlined"
          type="text"
          value={form.subtitle}
          onChange={handleChange('subtitle')}
          autoFocus
        />

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonStyle}
            onClick={handleCreateButton}
          >
            ENVIAR
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleClickClose}
          >
            FECHAR
          </Button>
        </DialogActions>
      </FormControl>
    </DialogContent>
  );
}
