import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { HeaderTabsProps } from '../types';

const HeaderTabs = ({ routes }: HeaderTabsProps) => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const headerRoutes = Object.values(routes).filter((e) => e.enabled == true);

  useEffect(() => {
    headerRoutes.map((e, index) => {
      if (location.pathname.includes(e.route)) {
        setValue(index);
      }
    });
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box data-testid="tabs-header-container">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        textColor="inherit"
        indicatorColor="secondary"
      >
        {headerRoutes.map((e, index) => {
          return <Tab component={Link} value={index} to={e.route} label={e.label} key={e.label} />;
        })}
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
