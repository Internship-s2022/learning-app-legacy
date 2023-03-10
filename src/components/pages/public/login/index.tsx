import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ThemeProvider } from '@mui/material';

import { images } from 'src/assets';
import { GoBackButton, InputPassword, InputText, Preloader, Text } from 'src/components/shared/ui';
import { responsiveTheme } from 'src/config/material-theme';
import { HomeRoutes, UserRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { login } from 'src/redux/modules/auth/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './login.module.css';
import { LoginFormValues } from './types';
import resolver from './validations';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        navigate(UserRoutes.newPassword.route);
      } else {
        if (response.payload.userType === 'SUPER_ADMIN') {
          navigate(HomeRoutes.superAdmin.route);
        } else if (response.payload.userType === 'NORMAL') {
          navigate(HomeRoutes.user.route);
        } else {
          navigate(HomeRoutes.homeScreen.route);
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
    <div className={styles.container}>
      <Box sx={{ mt: 3, ml: 4 }}>
        <GoBackButton route={HomeRoutes.homeScreen.route} />
      </Box>
      <section data-testid="login-container-section" className={styles.section}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Box data-testid="logo-container-div" className={styles.logoContainer}>
            <img
              src={images.rocketLogo.imagePath}
              alt={images.rocketLogo.alt}
              className={styles.img}
            />
            <ThemeProvider theme={responsiveTheme}>
              <Text variant="logo" className={styles.title}>
                <strong>Radium</strong> Learning
              </Text>
            </ThemeProvider>
          </Box>
          <Box data-testid="welcomeMsg-container-div" className={styles.textContainer}>
            <Box className={styles.h1Margin}>
              <Text variant="h1">Bienvenido</Text>
            </Box>
            <Text className={styles.h3} variant="subtitle2">
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
              placeholderColor="#eeeeee"
            />
            <InputPassword
              control={control}
              name="password"
              label="Ingresa tu contraseña"
              variant="standard"
              margin="normal"
              color="primary"
              className={styles.input}
              fullWidth={false}
              placeholderColor="#eeeeee"
            />
          </Box>
          <Box
            data-testid="forgotPassword-container-span"
            className={styles.forgetPasswordContainer}
          >
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
    </div>
  );
};

export default Login;
