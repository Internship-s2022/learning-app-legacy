import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { HeaderTabsProps } from '../types';

const HeaderTabs = ({ routes }: HeaderTabsProps) => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const { courseId } = useParams();

  const headerRoutes = useMemo(
    () => Object.values(routes).filter((e) => e.enabled == true),
    [routes],
  );

  useEffect(() => {
    const headerIndex = headerRoutes.findIndex((route) => {
      if (route.route.includes('course/:courseId' && route.route.split('/')[2])) {
        return location.pathname.includes(route.route.split('/')[2]);
      } else {
        return location.pathname.includes(route.route);
      }
    });
    setValue(headerIndex >= 0 ? headerIndex : 0);
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
          return (
            <Tab
              data-testid={`tabs-header-${index}`}
              component={Link}
              value={index}
              to={e.route.replace(':courseId', courseId)}
              label={e.label}
              key={e.label}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
