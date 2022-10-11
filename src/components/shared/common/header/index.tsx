import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import AppRoutes from 'src/constants/routes';

import styles from './header.module.css';

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar>
      <div className={styles.container}>
        <Toolbar disableGutters>
          <Button href="/">
            <RocketLaunchIcon />
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography className={styles.textButtons}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h5" noWrap component="a" href=""></Typography>
          <div className={styles.btnsNavBar}>
            {Object.values(AppRoutes).map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page.route}
              >
                {page.label}
              </Button>
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
