import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../shared/common';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  return (
    <div data-testid="layout-container-div" className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
