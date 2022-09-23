import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <div className={styles.brand}>SHOW_ENV: {process.env.REACT_APP_SHOW_ENV}</div>
        <div>
          <a href="https://www.facebook.com/radiumrocket" target="_blank" rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href="https://twitter.com/radiumrocket" target="_blank" rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href="https://www.instagram.com/radium.rocket/" target="_blank" rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.appName}>App</div>
        <ul className={styles.routes}>
          <li>
            <Link to={'login'}>Login</Link>
            <Link to={'home'}>Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
