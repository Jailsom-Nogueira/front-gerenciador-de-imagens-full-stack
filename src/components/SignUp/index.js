import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { useStyles, FormPageContainer, FormPageCard } from './styles';

import Loader from '../Loading';

import clsx from 'clsx';
import {
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Avatar,
  Typography,
  CardActions,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setForm({ ...form, showConfirmPassword: !form.showConfirmPassword });
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUpButton = (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      alert('A senha deve conter no mínimo 6 caracteres');
    } else if (form.password !== form.confirmPassword) {
      alert('Verifique as senhas');
    } else {
      registerUser();
    }
  };

  const registerUser = () => {
    setLoading(true);

    const body = {
      email: `${form.email}`,
      name: `${form.name}`,
      nickname: `${form.nickname}`,
      password: `${form.password}`,
    };

    axios
      .post(`${baseUrl}user/signup`, body)
      .then((response) => {
        window.localStorage.setItem(
          'token',
          response.data.userData.accessToken,
        );
        window.localStorage.setItem(
          'userId',
          JSON.stringify(response.data.userData.id),
        );
        setLoading(false);
        history.push('/CreateImage');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message + ', cadastro não realizado');
      });
  };

  const handleGoBackButton = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const loadingState = loading ? (
    <Loader />
  ) : (
    <>
      <Avatar className={classes.avatarStyle}>
        <AssignmentIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        CADASTRE-SE
      </Typography>
      <FormPageCard>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="email"
            required
            label="E-mail"
            variant="outlined"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="email@email.com"
            autoFocus
          />

          <TextField
            id="name"
            label="Nome"
            type="text"
            variant="outlined"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Nome"
            required
          />

          <TextField
            id="nickname"
            label="Apelido"
            type="text"
            variant="outlined"
            value={form.nickname}
            onChange={handleChange('nickname')}
            placeholder="Apelido"
            required
          />

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="password" required>
              Senha
            </InputLabel>
            <OutlinedInput
              id="password"
              type={form.showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {form.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="confirmPassword" required>
              Confirmar senha
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={form.showConfirmPassword ? 'text' : 'password'}
              value={form.confirmConfirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {form.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={130}
            />
          </FormControl>

          <CardActions>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.buttonStyle)}
              onClick={handleSignUpButton}
            >
              CADASTRAR
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleGoBackButton}
            >
              VOLTAR
            </Button>
          </CardActions>
        </form>
      </FormPageCard>{' '}
    </>
  );

  return <FormPageContainer> {loadingState} </FormPageContainer>;
}
