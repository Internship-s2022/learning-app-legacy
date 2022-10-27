import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { newPassword } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import rocketLogo from '../../../assets/rocket.png';
import styles from './recover.module.css';
import { NewPassFormValues } from './types';
import resolver from './validations';

const NewPassword = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const role = useSelector((state: RootReducer) => state.auth.authenticated?.userType);
  const uid = useSelector((state: RootReducer) => state.auth.authenticated?.currentUid);

  const { handleSubmit, control } = useForm<NewPassFormValues>({
    defaultValues: {
      newPass: '',
      repeatNewPass: '',
    },
    mode: 'onSubmit',
    resolver,
  });

  useEffect(() => {
    if (!uid) {
      history(HomeRoutes.login.route);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(newPassword({ newPassword: data.newPass, firebaseUid: uid }));
    if (role === 'NORMAL') {
      history(HomeRoutes.home.route);
    }
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={rocketLogo} alt="" className={styles.img} />
        <Text variant="h1" className={styles.title}>
          <strong>Radium</strong> Learning
        </Text>
        <Text className={styles.h2} variant="h2">
          Por favor crea una nueva contraseña
        </Text>
        <Box className={styles.inputContainer}>
          <InputText
            control={control}
            name="newPass"
            label="Nueva contraseña"
            variant="standard"
            margin="normal"
            type="password"
          />
          <InputText
            control={control}
            name="repeatNewPass"
            label="Repetir nueva contraseña"
            variant="standard"
            margin="normal"
            type="password"
          />
        </Box>
        <ul className={styles.list}>
          <li>
            <Text variant="h2" className={styles.listItem}>
              Las contraseñas deben ser iguales
            </Text>
          </li>
          <li>
            <Text variant="h2" className={styles.listItem}>
              Debe contener al menos 8 caracteres
            </Text>
          </li>
          <li>
            <Text variant="h2" className={styles.listItem}>
              Debe contener al menos una letra mayuscula y una minuscula
            </Text>
          </li>
        </ul>
        <Button className={styles.button} variant="contained" type="submit">
          Continuar
        </Button>
      </form>
    </section>
  );
};

export default NewPassword;
