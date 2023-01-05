import React from 'react';
import { Box, List } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';

import styles from './header.module.css';

const HomeScreenHeader = ({ routes }: { routes: JSX.Element[] }): JSX.Element => {
  return (
    <Box component="header" className={styles.container}>
      <Box className={styles.logoContainer}>
        <img
          className={styles.image}
          src={images.rocketLogoGreen.imagePath}
          alt={images.rocketLogoGreen.alt}
        />
        <Text variant="logo">
          <strong>Radium</strong> Learning
        </Text>
      </Box>
      <nav>
        <List className={styles.nav}>
          {routes.map((route) => (
            <Box key={route.key} className={styles.routeContainer}>
              {route}
            </Box>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default HomeScreenHeader;
