import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { HeaderNavProps } from './types';

const HeaderTabs = (props: HeaderNavProps) => {
  const { elements } = props;
  const [value, setValue] = React.useState(0);

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
        {elements.map((e, index) => {
          return <Tab component={Link} value={index} to={e.route} label={e.label} key={e.label} />;
        })}
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
