import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { newPassword } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import rocketLogo from '../../../assets/rocket.png';
import styles from './recover.module.css';
import { NewPassFormValues } from './types';

const NewPassword = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const role = useSelector((state: RootReducer) => state.auth.authenticated?.userType);
  const uid = useSelector((state: RootReducer) => state.auth.authenticated?.currentUid);

  const resolver = joiResolver(
    Joi.object({
      newPass: Joi.string()
        .min(8)
        .max(24)
        .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
        .messages({
          'string.min': 'Invalid password, it must contain at least 8 characters',
          'string.pattern.base': 'Invalid password, it must contain both letters and numbers',
        }),
      repeatNewPass: Joi.string()
        .equal(Joi.ref('newPass'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
    }),
  );

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
            label="New password"
            variant="standard"
            margin="normal"
            type="password"
          />
          <InputText
            control={control}
            name="repeatNewPass"
            label="Repeat new password"
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
