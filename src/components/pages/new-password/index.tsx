import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { images } from 'src/assets';
import { InputPassword, Preloader, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { newPassword } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import styles from './new-password.module.css';
import { NewPassFormValues } from './types';
import resolver from './validations';

const NewPassword = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const { isNewUser, currentUid, userType } = useSelector(
    (state: RootReducer) => state.auth.authenticated,
  );
  const isLoading = useSelector((state: RootReducer) => state.auth.isLoading);

  const { handleSubmit, control, formState } = useForm<NewPassFormValues>({
    defaultValues: {
      newPass: '',
      repeatNewPass: '',
    },
    mode: 'onChange',
    resolver,
  });
  const showMaxError =
    formState?.errors?.newPass?.type === 'string.max' ||
    formState?.errors?.newPass?.type === 'string.empty';
  const showMinError =
    formState?.errors?.newPass?.type === 'string.min' ||
    formState?.errors?.newPass?.type === 'string.empty';
  const showPatternError =
    formState?.errors?.newPass?.type === 'string.pattern.base' || showMinError;
  const showRepeatError =
    (formState?.isDirty && !formState?.touchedFields?.repeatNewPass) ||
    formState?.errors?.repeatNewPass?.type === 'any.only';

  useEffect(() => {
    if (!currentUid) {
      history(HomeRoutes.login.route);
    }
  }, []);

  const onSubmit = async (data) => {
    await dispatch(newPassword({ newPassword: data.newPass, firebaseUid: currentUid, isNewUser }));
    if (userType === 'NORMAL') {
      history(HomeRoutes.home.route);
    }
  };

  const paintLabelBasedOnError = (error: boolean) => {
    if (formState?.isDirty && !error) {
      return 'success.main';
    } else if (error) {
      return 'error';
    } else {
      return;
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.logoContainer}>
          <img src={images.rocketLogo.imagePath} alt={images.rocketLogo.alt} />
          <Text variant="logo">
            <strong>Radium</strong> Learning
          </Text>
        </Box>
        <Text className={styles.updatePasswordText} variant="body1">
          Por favor crea una nueva contraseña
        </Text>
        <Box className={styles.inputContainer}>
          <InputPassword
            control={control}
            name="newPass"
            label="Nueva contraseña"
            variant="standard"
            margin="normal"
            type="password"
            showError={false}
          />
          <InputPassword
            control={control}
            name="repeatNewPass"
            label="Repetir nueva contraseña"
            variant="standard"
            margin="normal"
            type="password"
            showError={false}
          />
        </Box>
        <ul className={styles.list}>
          <li>
            <Text
              variant="h2"
              className={styles.listItem}
              color={paintLabelBasedOnError(showRepeatError)}
            >
              Las contraseñas deben ser iguales
            </Text>
          </li>
          <li>
            <Text
              variant="h2"
              className={styles.listItem}
              color={paintLabelBasedOnError(showMinError || showMaxError)}
            >
              Debe contener al menos 8 caracteres y máximo 24 caracteres
            </Text>
          </li>
          <li>
            <Text
              variant="h2"
              className={styles.listItem}
              color={paintLabelBasedOnError(showPatternError)}
            >
              Debe contener al menos una letra mayúscula, una minúscula y un número
            </Text>
          </li>
        </ul>
        <Button variant="contained" type="submit" color="success">
          Continuar
        </Button>
      </form>
    </section>
  );
};

export default NewPassword;
