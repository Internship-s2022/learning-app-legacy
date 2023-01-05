import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar, Tooltip } from '@mui/material';

import HeaderNav from 'src/components/shared/common/header/components/header-navigation';
import { HomeRoutes } from 'src/constants/routes';
import { useAppDispatch } from 'src/redux';
import { logout } from 'src/redux/modules/auth/thunks';

import styles from './header.module.css';
import { HeaderProps } from './types';

const Header = ({ routes, logoutOption, textTitle, toggleSlider }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <AppBar data-testid="header-container-div" className={styles.header}>
      <Toolbar disableGutters className={styles.toolBar}>
        <Box className={styles.navTabBox}>
          <HeaderNav textTitle={textTitle} toggleSlider={toggleSlider} routes={routes} />
        </Box>
        <Box className={styles.authBox}>
          {logoutOption && (
            <Tooltip title="Log Out">
              <Button
                data-testid="header-logout-button"
                variant="text"
                endIcon={<LogoutIcon />}
                onClick={() => {
                  dispatch(logout());
                  navigate(HomeRoutes.login.route);
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
    </AppBar>
  );
};

export default Header;
