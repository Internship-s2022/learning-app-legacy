import { ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { login } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './login.module.css';

const Login = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();

  const onLogin = () => {
    dispatch(login({ email: 'agustin.chazaretta@radiumrocket.com', password: 'asdasd123' })).then(
      (response) => {
        if (response.payload?.userType === 'NORMAL') {
          history('/auth');
        }
      },
    );
  };

  return (
    <section className={styles.container}>
      <h2>{capitalizeFirstLetter('login')}</h2>
      <Button variant="contained" onClick={() => onLogin()}>
        Click to login
      </Button>
    </section>
  );
};

export default Login;
