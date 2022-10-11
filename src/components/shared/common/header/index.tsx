import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';

import AppRoutes from 'src/constants/routes';

import styles from './header.module.css';

const Header = () => {
  return (
    <AppBar>
      <div className={styles.container}>
        <Toolbar disableGutters>
          <Button href="/">
            <RocketLaunchIcon />
          </Button>
          <Link to={'/'}>
            <Box className={styles.btnsNavBar}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              ></IconButton>
            </Box>
          </Link>
          <div className={styles.btnsNavBar}>
            {Object.values(AppRoutes).map((page) => (
              <Link to={page.route} key={page.label}>
                <Button key={page.label}>{page.label}</Button>
              </Link>
            ))}
          </div>
          <Box>
            <Tooltip title="Log Out">
              <LogoutIcon></LogoutIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
