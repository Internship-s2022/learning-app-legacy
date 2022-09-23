import React from 'react';

import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './login.module.css';

const Login = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <h2>{capitalizeFirstLetter('login')}</h2>
    </section>
  );
};

export default Login;
