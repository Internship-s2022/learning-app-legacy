import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { HeaderNavProps } from './types';

const HeaderTabs = (props: HeaderNavProps) => {
  const { elements } = props;
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!location.pathname.includes(elements[value].route)) {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        textColor="inherit"
        indicatorColor="secondary"
      >
        {elements.map((e, index) => (
          <Tab component={Link} value={index} to={e.route} label={e.label} key={e.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
