import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import { images } from 'src/assets';
import { HeaderTabs, Text } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import { HeaderProps } from '../../types';
import styles from './header-nav.module.css';

const HeaderNav = ({ textTitle, toggleSlider, routes }: HeaderProps) => {
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);

  return (
    <>
      <IconButton onClick={toggleSlider} color="inherit">
        {routes && textTitle && authenticated?.userType === 'NORMAL' ? (
          <MenuIcon />
        ) : (
          <img src={images.rocketLogoTab.imagePath} alt={images.rocketLogoTab.alt} />
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
