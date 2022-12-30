import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import { images } from 'src/assets';
import { HeaderTabs, Text } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './header-nav.module.css';
import { HeaderNavProps } from './types';

const HeaderNav = ({ textTitle, toggleSlider, routes }: HeaderNavProps) => {
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);

  return (
    <>
      <IconButton
        data-testid="header-logo-button"
        onClick={toggleSlider}
        color="inherit"
        className={styles.buttonContainer}
      >
        {routes && textTitle && authenticated?.userType === 'NORMAL' ? (
          <MenuIcon />
        ) : (
          <Link to="" className={styles.rocketLogoContainer}>
            <img
              className={styles.image}
              src={images.rocketLogoWhite.imagePath}
              alt={images.rocketLogoWhite.alt}
            />
          </Link>
        )}
      </IconButton>
      {textTitle && (
        <Text variant="h1" color={'white'} className={styles.textTitle}>
          {textTitle}
        </Text>
      )}
      {routes && <HeaderTabs routes={routes} />}
    </>
  );
};
export default HeaderNav;
