import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, List } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

import PublicDrawer from '../drawer';
import styles from './header.module.css';

const HomeScreenHeader = ({ routes }: { routes: JSX.Element[] }): JSX.Element => {
  const { isLaptop } = useWindowDimensions();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isLaptop) {
      setIsDrawerOpen(false);
    }
  }, [isLaptop]);

  return (
    <>
      <Box component="header">
        <Box className={styles.container}>
          <Box className={styles.mainContainer}>
            <IconButton
              aria-label="Drawer icon button"
              onClick={() => setIsDrawerOpen(true)}
              className={styles.drawerButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={styles.logoContainer}>
              <img
                className={styles.image}
                src={images.rocketLogoGreen.imagePath}
                alt={images.rocketLogoGreen.alt}
              />
              <Text variant="logo">
                <strong>Radium</strong> Learning
              </Text>
            </Link>
            <div className={styles.drawerButton} />
          </Box>
          <nav>
            <List className={styles.navList}>
              {routes.map((route) => (
                <Box key={route.key} className={styles.routeContainer} component="li">
                  {route}
                </Box>
              ))}
            </List>
          </nav>
        </Box>
      </Box>
      <PublicDrawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default HomeScreenHeader;
