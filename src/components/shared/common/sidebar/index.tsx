import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from '@mui/material';

import SideList from './components/list';
import styles from './side-bar.module.css';
import { SidebarProps } from './types';

const Sidebar = ({ sidebarRoutes, toggleSlider, open }: SidebarProps) => {
  return (
    <>
      <CssBaseline />
      <Box data-testid="sidebar-container-div" component="nav" className={styles.container}>
        <AppBar position="static">
          <Toolbar>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              <SideList sidebarRoutes={sidebarRoutes} toggleSlider={toggleSlider} />
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Sidebar;
