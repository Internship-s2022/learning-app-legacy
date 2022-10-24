import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import styles from './users.module.css';

const Users = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <h2>Welcome to Users Screen</h2>
      <Button variant="contained">
        <Link to="add">Add User</Link>
      </Button>
    </section>
  );
};

export default Users;
