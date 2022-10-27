import { ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { images } from 'src/assets';
import { InputText, Preloader, Text } from 'src/components/shared/ui';
import { HomeRoutes, UserRoutes } from 'src/constants/routes';
import { login } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './login.module.css';
import { LoginFormValues } from './types';
import resolver from './validations';

const Login = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();

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
        history('/new-password');
      } else {
        history('/home');
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
        <img src={images.rocketLogo.imagePath} alt={images.rocketLogo.alt} />
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
        <Button className={styles.button} variant="contained" type="submit">
          Ingresar
        </Button>
      </form>
    </section>
  );
};

export default Login;
