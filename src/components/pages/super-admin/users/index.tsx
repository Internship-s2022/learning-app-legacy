import React from 'react';

import ListUser from './list';
import styles from './users.module.css';

const Users = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <ListUser />
    </section>
  );
};

export default Users;
