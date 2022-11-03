import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootReducer } from 'src/redux/modules/types';

import { Footer, Header, SideBar } from '../shared/common';
import styles from './layout.module.css';
import { LayoutProps } from './types';

const Layout = ({ routes, children, sidebarOn, footerOn }: LayoutProps): JSX.Element => {
  const authenticated = useSelector((state: RootReducer) => state.auth.authenticated);

  return (
    <div data-testid="layout-container-div" className={styles.container}>
      <Header routes={routes} logoutOption={!!authenticated.token} />
      {sidebarOn && <SideBar routes={routes} />}
      {children ? children : <Outlet />}
      {footerOn && <Footer />}
    </div>
  );
};

export default Layout;
