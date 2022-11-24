import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from '@mui/material';

import styles from './side-bar.module.css';
import SideList from './side-list';
import { SideBarProps } from './types';

const SideBar = ({ sideBarRoutes, toggleSlider, open }: SideBarProps) => {
  return (
    <>
      <CssBaseline />
      <Box data-testid="sidebar-container-div" component="nav" className={styles.container}>
        <AppBar position="static">
          <Toolbar>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              <SideList sideBarRoutes={sideBarRoutes} toggleSlider={toggleSlider} />
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default SideBar;
