import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import { Footer, Header, SideBar } from '../shared/common';
import { Preloader } from '../shared/ui';
import styles from './layout.module.css';
import { LayoutProps } from './types';

const Layout = ({
  headerRoutes,
  sideBarRoutes,
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
        <SideBar sideBarRoutes={sideBarRoutes} toggleSlider={toggleSlider} open={open} />
      )}
      {children ? children : <Outlet />}
      {footerOn && <Footer />}
    </div>
  );
};

export default Layout;
