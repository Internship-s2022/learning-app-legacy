import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { Preloader } from 'src/components/shared/ui';
import { login } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './login.module.css';

const Login = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const { authenticated: role, isLoading } = useSelector((state: RootReducer) => state.auth);
  const token = sessionStorage.getItem('token');

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

  const onLogin = async () => {
    await dispatch(login({ email: 'super.admin@radiumrocket.com', password: 'Passw0rd1234' })).then(
      (response) => {
        if (response) {
          redirect(response.payload?.role);
        }
      },
    );
  };

  return isLoading || token ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2>{capitalizeFirstLetter('login')}</h2>
      <Button variant="contained" onClick={() => onLogin()}>
        Click to login
      </Button>
    </section>
  );
};

export default Login;
