import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Drawer, Toolbar } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';
import { UserRoutes } from 'src/constants/routes';

import CourseList from './components/list';
import styles from './sidebar.module.css';
import { SidebarProps } from './types';

const Sidebar = ({ sidebarRoutes, toggleSlider, open }: SidebarProps) => {
  return (
    <Box data-testid="sidebar-container-div" component="nav" className={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <Drawer open={open} anchor="left" onClose={toggleSlider}>
            <Box component="div" className={styles.drawerContent}>
              <Link to={UserRoutes.main.route} className={styles.headerSidebar}>
                <img
                  src={images.rocketLogo.imagePath}
                  alt={images.rocketLogo.alt}
                  className={styles.logoImg}
                />
                <Text variant="logo" className={styles.title}>
                  <strong>Radium</strong> Learning
                </Text>
              </Link>
              <CourseList sidebarRoutes={sidebarRoutes} toggleSlider={toggleSlider} />
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
