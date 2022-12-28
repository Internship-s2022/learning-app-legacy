import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { images } from 'src/assets';
import { InputPassword, Preloader, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getMe, newPassword } from 'src/redux/modules/auth/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './new-password.module.css';
import { NewPassFormValues } from './types';
import resolver from './validations';

const NewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { isNewUser, currentUid, userType } = useAppSelector(
    (state: RootReducer) => state.auth.authenticated,
  );
  const isLoading = useAppSelector((state: RootReducer) => state.auth.isLoading);

  const { handleSubmit, control, formState, watch } = useForm<NewPassFormValues>({
    defaultValues: {
      newPass: '',
      repeatNewPass: '',
    },
    mode: 'all',
    resolver,
  });

  const showMaxError =
    formState?.errors?.newPass?.type === 'string.max' ||
    formState?.errors?.newPass?.type === 'string.empty';
  const showMinError =
    formState?.errors?.newPass?.type === 'string.min' ||
    formState?.errors?.newPass?.type === 'string.empty';
  const showPatternError =
    formState?.errors?.newPass?.type === 'string.pattern.base' || showMinError || showMaxError;
  const showRepeatError =
    watch('newPass') !== watch('repeatNewPass') ||
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
      dispatch(getMe());
      history(HomeRoutes.homeUser.route);
    }
  };

  const paintLabelBasedOnError = (error: boolean) => {
    if (formState?.isDirty) {
      if (error) return 'error';
      else return 'success.main';
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <section data-testid="newPassword-container-section" className={styles.container}>
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
              variant="subtitle1"
              className={styles.listItem}
              color={paintLabelBasedOnError(showRepeatError)}
            >
              Las contraseñas deben ser iguales
            </Text>
          </li>
          <li>
            <Text
              variant="subtitle1"
              className={styles.listItem}
              color={paintLabelBasedOnError(showMinError || showMaxError)}
            >
              Debe contener al menos 8 caracteres y máximo 24 caracteres
            </Text>
          </li>
          <li>
            <Text
              variant="subtitle1"
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
