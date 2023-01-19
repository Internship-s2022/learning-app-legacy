import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';

import { images } from 'src/assets';
import { LoginButton } from 'src/components/shared/ui';
import { publicDrawerRoutes } from 'src/constants/public-header';

import styles from './drawer.module.css';
import { PublicDrawerProps } from './types';

const PublicDrawer = ({ anchor = 'left', ...rest }: PublicDrawerProps): JSX.Element => {
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
          {publicDrawerRoutes.map(({ text, ...restRoute }) => (
            <ListItem key={text} className={styles.routeContainer} disablePadding>
              <ListItemButton {...restRoute} onClick={(e) => rest?.onClose?.(e, 'backdropClick')}>
                {text}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <LoginButton />
      </Box>
    </Drawer>
  );
};

export default PublicDrawer;
