import React from 'react';

import styles from './landing.module.css';

const Landing = (): JSX.Element => {
  return (
    <section data-testid="landing-container-section" className={styles.container}>
      <h2>Landing screen.</h2>
    </section>
  );
};

export default Landing;
