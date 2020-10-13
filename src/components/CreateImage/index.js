import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as dayjs from 'dayjs';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import Loader from '../Loading';

import { FormPageContainer, FormPageCard, ButtonContainer } from './styles';

import clsx from 'clsx';
import {
  makeStyles,
  Button,
  TextField,
  Avatar,
  Typography,
  FormControl,
  CardMedia,
} from '@material-ui/core';

import { KeyboardDatePicker } from '@material-ui/pickers';

import CropOriginalIcon from '@material-ui/icons/CropOriginal';

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
  avatarStyle: {
    color: '#fff',
    backgroundColor: '#ff6d00',
    marginBottom: theme.spacing(1),
  },
  typographyStyle: {
    color: '#fff',
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function CreateImage() {
  const [link, setLink] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  }, [history, token]);

  const [form, setForm] = useState({
    subtitle: '',
    author: '',
    collection: '',
  });
  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const [tags, setTags] = useState('');
  const handleTagsChange = (event) => {
    const tagsString = event.target.value;
    const tagsArray = tagsString.replace(/\s/g, ','); //spaces to comma
    const onlyString = tagsArray.replace(/[^A-Za-z,]/g, ''); //only letters and coma
    const onlyOneComma = onlyString.replace(/[,]{2,}/g, ','); //only one comma per time
    setTags(onlyOneComma);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    const inputDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(inputDate);
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
    setLoading(true);

    const body = {
      subtitle: `${form.subtitle}`,
      author: `${form.author}`,
      date: `${selectedDate}`,
      file: `${link}`,
      tags: `${tags}`,
      collection: `${form.collection}`,
    };

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    axios
      .post(`${baseUrl}image/createImage`, body, axiosConfig)
      .then((response) => {
        setLoading(false);
        alert(response.data.message);
        setTags('');
        setForm({ subtitle: '', author: '', collection: '' });
        setSelectedDate(new Date());
        setLink();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const handleToGalleryButton = (event) => {
    event.preventDefault();
    history.push('/Gallery');
  };

  const loadingState = loading ? (
    <Loader />
  ) : (
    <>
      <Avatar className={classes.avatarStyle}>
        <CropOriginalIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        CRIAR IMAGEM
      </Typography>
      <FormPageCard>
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
            // <div>
            //   <img src={link} alt={'Imagem'} />
            // </div>
          )}

          <input type={'file'} onChange={handleFile} />

          <TextField
            id="subtitle"
            required
            label="Título"
            variant="outlined"
            type="text"
            value={form.subtitle}
            onChange={handleChange('subtitle')}
            autoFocus
          />

          <TextField
            id="author"
            required
            label="Autor"
            variant="outlined"
            type="text"
            value={form.author}
            onChange={handleChange('author')}
          />

          <TextField
            id="tags"
            required
            label="#tags"
            variant="outlined"
            type="text"
            value={tags}
            onChange={handleTagsChange}
          />

          <TextField
            id="collection"
            required
            label="Coleção"
            variant="outlined"
            type="text"
            value={form.collection}
            onChange={handleChange('collection')}
          />

          <KeyboardDatePicker
            id="date-picker"
            required
            disableToolbar
            maxDate={new Date()}
            maxDateMessage="Data não deve passar de hoje"
            minDate="Date(1000-01-01)"
            minDateMessage="Data não deve ser anterior a 01/01/1000DC"
            variant="outlined"
            format="DD/MM/YYYY"
            margin="normal"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.buttonStyle)}
              onClick={handleCreateButton}
            >
              ENVIAR
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleToGalleryButton}
            >
              MINHAS IMAGENS
            </Button>
          </ButtonContainer>
        </FormControl>
      </FormPageCard>
    </>
  );

  return <FormPageContainer>{loadingState};</FormPageContainer>;
}
