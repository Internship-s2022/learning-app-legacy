import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Footer, Header, SideBar } from '../shared/common';
import styles from './layout.module.css';
import { LayoutProps } from './types';

const Layout = ({ routes, children, sidebarOn, footerOn }: LayoutProps): JSX.Element => {
  const token = sessionStorage.getItem('token');

  return (
    <div data-testid="layout-container-div" className={styles.container}>
      <Header routes={routes} logoutOption={!!token} />
      {sidebarOn && <SideBar routes={routes} />}
      <Box className={styles.outlet}>{children ? children : <Outlet />}</Box>
      {footerOn && <Footer />}
    </div>
  );
};

export default Layout;
