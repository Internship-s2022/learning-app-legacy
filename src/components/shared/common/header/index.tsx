import { ThunkDispatch } from 'redux-thunk';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Tabs, Toolbar, Tooltip } from '@mui/material';

import { images } from 'src/assets';
import { HeaderTabs } from 'src/components/shared/ui';
import { HomeRoutes, SuperAdminRoutes } from 'src/constants/routes';
import { logout } from 'src/redux/modules/auth/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';

import styles from './header.module.css';
import { HeaderProps } from './types';

const Header = ({ routes, logoutOption }: HeaderProps) => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const { authenticated } = useSelector((state: RootReducer) => state.auth);
  const [value, setValue] = React.useState(0);
  const superAdminHeader = [
    { label: SuperAdminRoutes.users.label, route: SuperAdminRoutes.users.route },
    { label: SuperAdminRoutes.courses.label, route: SuperAdminRoutes.courses.route },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log('value', value);
  return (
    <AppBar>
      <div className={styles.container}>
        <Tabs value={value} onChange={handleChange}>
          <Toolbar disableGutters className={styles.toolBar}>
            <Box className={styles.navTabBox}>
              <Link to={''}>
                <IconButton color="inherit">
                  <img src={images.rocketLogoTab.imagePath} alt={images.rocketLogoTab.alt} />
                </IconButton>
              </Link>
              {authenticated?.userType === 'SUPER_ADMIN' ? (
                <HeaderTabs elements={superAdminHeader} />
              ) : null}
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
        </Tabs>
      </div>
    </AppBar>
  );
};

export default Header;
