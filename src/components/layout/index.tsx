import React from 'react';

import { Home, Login } from '../pages';
import { Footer, Header } from '../shared/common';
import styles from './layout.module.css';

const Layout = () => {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/login':
      currentScreen = <Login />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
};

export default Layout;
