import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button } from '@mui/material';

import { InputText, Preloader, Text } from 'src/components/shared/ui';
import { HomeRoutes, UserRoutes } from 'src/constants/routes';
import { login } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import rocketLogo from '../../../assets/rocket.png';
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
      .max(24)
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
  const isLoading = useSelector((state: RootReducer) => state.auth.isLoading);

  const { handleSubmit, control } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver,
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login({ email: data.email, password: data.password }));
      //TO-DO: redirect in case of a super admin
      if (response.payload.isNewUser) {
        history(UserRoutes.newPassword.route);
      } else {
        history(HomeRoutes.home.route);
      }
    } catch (error) {
      dispatch(
        openModal({
          title: 'Login error',
          description: 'invalid email or password',
          type: 'alert',
        }),
      );
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <img src={rocketLogo} alt="rocketLogo" />
        <Text variant="h1" className={styles.title}>
          <strong>Radium</strong> Learning
        </Text>
        <Box className={styles.textContainer}>
          <Text className={styles.h2} variant="h2">
            Bienvenido
          </Text>
          <Text className={styles.h3} variant="h3">
            Por favor, ingresa tu mail y contraseña
          </Text>
        </Box>
        <Box className={styles.inputContainer}>
          <InputText
            control={control}
            name="email"
            label="Ingresa tu mail"
            variant="standard"
            margin="normal"
            className={styles.input}
          />
          <InputText
            control={control}
            name="password"
            label="Ingresa tu password"
            variant="standard"
            margin="normal"
            type="password"
            className={styles.input}
          />
        </Box>
        <Button className={styles.button} variant="contained" type="submit">
          Ingresar
        </Button>
      </form>
    </section>
  );
};

export default Login;
