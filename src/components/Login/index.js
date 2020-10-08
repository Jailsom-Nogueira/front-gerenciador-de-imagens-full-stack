import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import { FormPageContainer, FormPageCard } from './styles';

import clsx from 'clsx';
import {
  makeStyles,
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Avatar,
  Typography,
  CardActions,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
  textValidator: {
    width: '100%',
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
    if (form.password.length < 6) {
      alert('A senha deve conter no mínimo 6 caracteres');
    } else {
      handleLogin();
    }
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
        history.push('/CreateImage');
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
        <ValidatorForm
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleLoginButton}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            className={classes.textValidator}
            id="email"
            required
            label="E-mail"
            variant="outlined"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            onError={(errors) => console.log(errors)}
            autoFocus
            validators={['required', 'isEmail']}
            errorMessages={['campo requerido', 'email inválido']}
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

          <CardActions>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.buttonStyle)}
              type="submit"
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
          </CardActions>
        </ValidatorForm>
      </FormPageCard>
    </FormPageContainer>
  );
}
