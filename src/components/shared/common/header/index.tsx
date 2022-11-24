import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';

import { images } from 'src/assets';
import { HeaderTabs, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { logout } from 'src/redux/modules/auth/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './header.module.css';
import { HeaderProps } from './types';

const Header = ({ routes, logoutOption, textTitle, toggleSlider }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);

  const headerAdmin = () => {
    if (routes && textTitle) {
      return (
        <>
          <IconButton onClick={toggleSlider} color="inherit">
            <MenuIcon />
          </IconButton>
          <Text variant="h1" color={'white'} className={styles.textTitle}>
            {textTitle}
          </Text>
          <HeaderTabs routes={routes} />
        </>
      );
    }
    if (routes) {
      return (
        <>
          <IconButton data-testid="header-logo-button" color="inherit">
            <img src={images.rocketLogoTab.imagePath} alt={images.rocketLogoTab.alt} />
          </IconButton>
          <HeaderTabs routes={routes} />
        </>
      );
    }
    if (textTitle) {
      return (
        <>
          <IconButton data-testid="header-logo-button" color="inherit">
            <img src={images.rocketLogoTab.imagePath} alt={images.rocketLogoTab.alt} />
          </IconButton>
          <Text className={styles.textTitle} variant="h1" color={'white'}>
            {textTitle}
          </Text>
        </>
      );
    }
  };

  return (
    <AppBar>
      <div data-testid="header-container-div" className={styles.container}>
        <Toolbar disableGutters className={styles.toolBar}>
          <Box className={styles.navTabBox}>
            <Link to=""></Link>
            {authenticated?.userType === 'SUPER_ADMIN' ? (
              <>
                <IconButton data-testid="header-logo-button" color="inherit">
                  <img src={images.rocketLogoTab.imagePath} alt={images.rocketLogoTab.alt} />
                </IconButton>
                <HeaderTabs routes={routes} />
              </>
            ) : null}
            {authenticated?.userType === 'NORMAL' ? headerAdmin() : null}
          </Box>
          <Box className={styles.authBox}>
            {logoutOption && (
              <Tooltip title="Log Out">
                <Button
                  variant="text"
                  endIcon={<LogoutIcon />}
                  onClick={() => {
                    dispatch(logout());
                    history(HomeRoutes.login.route);
                  }}
                >
                  Salir
                </Button>
              </Tooltip>
            )}
            {!logoutOption && routes?.login?.label && (
              <Link to={routes.login.route} key={routes.login.label}>
                <Button key={routes.login.label}>{routes.login.label}</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
