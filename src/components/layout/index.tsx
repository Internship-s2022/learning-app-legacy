import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import { Footer, Header, Sidebar } from '../shared/common';
import { Preloader } from '../shared/ui';
import styles from './layout.module.css';
import { LayoutProps } from './types';

const Layout = ({
  headerRoutes,
  sidebarRoutes,
  children,
  sidebarOn,
  footerOn,
  textTitle,
}: LayoutProps): JSX.Element => {
  const token = sessionStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const { isLoading } = useAppSelector((state: RootReducer) => state.auth);
  const toggleSlider = () => {
    setOpen(!open);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div data-testid="layout-container-div" className={styles.container}>
      <Header
        routes={headerRoutes}
        logoutOption={!!token}
        textTitle={textTitle}
        toggleSlider={toggleSlider}
      />
      {sidebarOn && (
        <Sidebar sidebarRoutes={sidebarRoutes} toggleSlider={toggleSlider} open={open} />
      )}
      <Box className={styles.outlet}>{children ? children : <Outlet />}</Box>
      {footerOn && <Footer />}
    </div>
  );
};

export default Layout;
