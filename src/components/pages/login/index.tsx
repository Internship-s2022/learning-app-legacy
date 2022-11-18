import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { images } from 'src/assets';
import { InputPassword, InputText, Preloader, Text } from 'src/components/shared/ui';
import { AdminRoutes, HomeRoutes, SuperAdminRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { login } from 'src/redux/modules/auth/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './login.module.css';
import { LoginFormValues } from './types';
import resolver from './validations';

const screen = 'login';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { isLoading } = useAppSelector((state: RootReducer) => state.auth);
  const { handleSubmit, control, setError, clearErrors } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver,
  });
  const onSubmit = async (data) => {
    try {
      clearErrors();
      const response = await dispatch(login({ email: data.email, password: data.password }));
      if (response.payload.isNewUser) {
        history('/new-password');
      } else {
        if (response.payload.userType === 'SUPER_ADMIN') {
          history(SuperAdminRoutes.main.route);
        } else if (response.payload.userType === 'NORMAL') {
          history(AdminRoutes.main.route);
        } else {
          history(HomeRoutes.home.route);
        }
      }
    } catch (error) {
      setError('email', { message: 'Email incorrecto' });
      setError('password', { message: 'Contraseña incorrecta' });
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section data-testid="login-container-section" className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box data-testid="logo-container-div" className={styles.logoContainer}>
          <img src={images.rocketLogo.imagePath} alt={images.rocketLogo.alt} />
          <Text variant="logo" className={styles.title}>
            <strong>Radium</strong> Learning
          </Text>
        </Box>
        <Box data-testid="welcomeMsg-container-div" className={styles.textContainer}>
          <Box className={styles.h1Margin}>
            <Text variant="h1">Bienvenido</Text>
          </Box>
          <Text className={styles.h3} variant="h3">
            Por favor, ingresa tu mail y contraseña
          </Text>
        </Box>
        <Box data-testid="login-container-div" className={styles.inputContainer}>
          <InputText
            control={control}
            name="email"
            label="Ingresa tu mail"
            variant="standard"
            margin="normal"
            color="primary"
            className={styles.input}
            fullWidth={false}
            data-testid={screen}
          />
          <InputPassword
            control={control}
            name="password"
            label="Ingresa tu password"
            variant="standard"
            margin="normal"
            color="primary"
            className={styles.input}
            fullWidth={false}
            data-testid={screen}
          />
        </Box>
        <Box className={styles.forgetPasswordContainer}>
          <Text variant="body2Underline">¿Olvidaste tu contraseña?</Text>
        </Box>
        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          color="secondary"
          data-testid="login-btn"
        >
          Ingresar
        </Button>
      </form>
    </section>
  );
};

export default Login;
