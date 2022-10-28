import { ThunkDispatch } from 'redux-thunk';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';

import { logout } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import styles from './header.module.css';
import { HeaderProps } from './types';

const Header = ({ routes, logoutOption }: HeaderProps) => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  return (
    <AppBar>
      <div className={styles.container}>
        <Toolbar disableGutters>
          <Link to={''}>
            <Box>
              <IconButton color="primary">
                <RocketLaunchIcon />
              </IconButton>
            </Box>
          </Link>
          {routes && (
            <div className={styles.btnsNavBar}>
              {Object.values(routes).map(
                (page) =>
                  !page.disabled && (
                    <Link to={page.route} key={page.label}>
                      <Button key={page.label}>{page.label}</Button>
                    </Link>
                  ),
              )}
            </div>
          )}
          <Box className={styles.authBox}>
            {logoutOption && (
              <Tooltip title="Log Out">
                <Button variant="text" endIcon={<LogoutIcon />} onClick={() => dispatch(logout())}>
                  Logout
                </Button>
              </Tooltip>
            )}
            {routes?.login?.label && (
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
