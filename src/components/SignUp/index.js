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
import AssignmentIcon from '@material-ui/icons/Assignment';

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

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [form, setForm] = React.useState({
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
    const password1 = form.password;
    const password2 = form.confirmPassword;

    event.preventDefault();
    if (password1 === password2) {
      registerUser();
    } else {
      alert('Verifique as senhas');
    }
  };

  const registerUser = () => {
    const body = {
      email: `${form.email}`,
      name: `${form.name}`,
      nickname: `${form.nickname}`,
      password: `${form.password}`,
    };
    console.log(`${baseUrl}user/signup`, body);
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

        history.push('/CreateImage');
      })
      .catch((error) => {
        alert(error.response.data.message + ', cadastro não realizado');
      });
  };

  const handleGoBackButton = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <FormPageContainer>
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
            <InputLabel htmlFor="password">Senha</InputLabel>
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
              labelWidth={70}
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="confirmPassword">Senha</InputLabel>
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
              labelWidth={70}
            />
          </FormControl>

          <ButtonContainer>
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
          </ButtonContainer>
        </form>
      </FormPageCard>
    </FormPageContainer>
  );
}
