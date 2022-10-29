import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { SuperAdminRoutes } from 'src/constants/routes';

import ListUser from './list';
import styles from './users.module.css';

const Users = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section className={styles.container}>
      <ListUser />
      <h2>Welcome to Users Screen</h2>
      <Button variant="contained" onClick={() => navigate(SuperAdminRoutes.addUser.route)}>
        Agregar usuario
      </Button>
    </section>
  );
};

export default Users;
