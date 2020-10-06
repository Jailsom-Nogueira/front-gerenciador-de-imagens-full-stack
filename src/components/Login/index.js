import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { FormPageContainer, FormPageCard, ButtonContainer } from './styles';

import clsx from 'clsx';
import {
  makeStyles,
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Avatar,
  Typography,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(1),
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
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: '',
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

  const handleLoginButton = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const handleSignUpButton = (event) => {
    event.preventDefault();
    history.push('/SignUp');
  };

  const handleLogin = () => {
    const body = {
      email: `${form.email}`,
      password: `${form.password}`,
    };
    axios
      .post(`${baseUrl}user/login`, body)
      .then((response) => {
        window.localStorage.setItem(
          'token',
          response.data.userData.accessToken,
        );
        window.localStorage.setItem(
          'userId',
          JSON.stringify(response.data.userData.id),
        );
        alert('Logado!');
        // history.push('/CreateImage');
      })
      .catch((err) => {
        alert('Não foi possível fazer seu login, erro: ' + err.message);
      });
  };

  return (
    <FormPageContainer>
      <Avatar className={classes.avatarStyle}>
        <LockOpenIcon />
      </Avatar>
      <Typography
        className={classes.typographyStyle}
        component="h3"
        variant="h5"
      >
        LOGIN
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
            autoComplete="email"
            autoFocus
          />

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              required
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
              labelWidth={70}
            />
          </FormControl>
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.buttonStyle)}
              onClick={handleLoginButton}
            >
              ENTRAR
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSignUpButton}
            >
              CADASTRAR
            </Button>
          </ButtonContainer>
        </form>
      </FormPageCard>
    </FormPageContainer>
  );
}