import { ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { logout } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import styles from './page.module.css';

const PrivatePage = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  return (
    <section className={styles.container}>
      <h2>Welcome</h2>
      <Button variant="contained" onClick={() => dispatch(logout())}>
        Click to logout
      </Button>
    </section>
  );
};

export default PrivatePage;
