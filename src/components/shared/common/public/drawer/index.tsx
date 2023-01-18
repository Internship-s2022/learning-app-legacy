import React, { useEffect, useMemo } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';

import { images } from 'src/assets';
import { LoginButton } from 'src/components/shared/ui';

import styles from './drawer.module.css';
import { PublicDrawerProps } from './types';

const PublicDrawer = ({ routes, anchor = 'left', ...rest }: PublicDrawerProps): JSX.Element => {
  const routesCopy = useMemo(() => routes?.map((route) => route) || [], [routes]);

  useEffect(() => {
    routesCopy.pop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer anchor={anchor} {...rest}>
      <Box className={styles.container}>
        <Box className={styles.logoImageContainer}>
          <img
            className={styles.logoImage}
            src={images.rocketLogoGreen.imagePath}
            alt={images.rocketLogoGreen.alt}
          />
        </Box>
        <List>
          {routesCopy.map((route) => (
            <ListItem key={route.key} className={styles.routeContainer} disablePadding>
              <ListItemButton>{route}</ListItemButton>
            </ListItem>
          ))}
        </List>
        <LoginButton />
      </Box>
    </Drawer>
  );
};

export default PublicDrawer;
