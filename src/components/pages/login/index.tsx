import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { Preloader } from 'src/components/shared/ui';
import { login } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import styles from './login.module.css';
import { LoginFormValues } from './types';

const resolver = joiResolver(
  Joi.object({
    email: Joi.string()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .messages({
        'string.pattern.base': 'Invalid email format',
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base': 'Invalid password, it must contain both letters and numbers',
      }),
  }),
);

const Login = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  // const role = useSelector((state: RootReducer) => state.auth.authenticated?.userType);
  const isNewUser = useSelector((state: RootReducer) => state.auth.authenticated?.isNewUser);
  const error = useSelector((state: RootReducer) => state.auth.error);
  const isLoading = useSelector((state: RootReducer) => state.auth.isLoading);
  const auth = useSelector((state: RootReducer) => state.auth);

  const { handleSubmit, control } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver,
  });

  useEffect(() => {
    redirect(role.userType);
  }, [role]);

  const redirect = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return history('/super-admin/users');
      default:
        break;
    }
  };

  const onSubmit = (data) => {
    dispatch(login({ email: data.email, password: data.password })).then(() => {
      console.log('auth', auth);
    });
    if (error) console.log('error', error);
    if (isNewUser) history('/recovery');
    history('/home').then((response) => {
      if (response) {
        redirect(response.payload?.role);
      }
    });
  };

  return isLoading || token ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <form>
        <img
          src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png"
          alt=""
          className={styles.img}
        />
        <Text variant="h1" className={styles.title}>
          Radium Learning
        </Text>
        <Text className={styles.h2} variant="h2">
          Bienvenido
        </Text>
        <Text className={styles.h3} variant="h3">
          Por favor, ingresa tu mail y contraseña
        </Text>
        <Box className={styles.inputContainer}>
          <InputText
            control={control}
            name="email"
            label="Ingresa tu mail"
            variant="standard"
            margin="normal"
          />
          <InputText
            control={control}
            name="password"
            label="Ingresa tu password"
            variant="standard"
            margin="normal"
            type="password"
          />
        </Box>
        <Button className={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>
          Ingresar
        </Button>
      </form>
    </section>
  );
};

export default Login;
