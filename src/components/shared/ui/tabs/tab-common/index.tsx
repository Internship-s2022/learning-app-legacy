import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from '../components/tab-panel';
import { CommonTabsProps } from '../types';
import styles from './tab.module.css';

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CommonTabs = (props: CommonTabsProps) => {
  const { elements, onChange } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange && onChange();
    setValue(newValue);
  };

  return (
    <Box className={styles.container}>
      <Box data-testid="tab-common-container" className={styles.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="secondary"
        >
          {elements.map((e, index) => (
            <Tab
              data-testid={`tab-${index}`}
              className={styles.tab}
              key={e.label}
              label={e.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {elements.map((e, index) => (
        <TabPanel value={index} index={value} key={e.label}>
          {e.element}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CommonTabs;
