import * as React from 'react';
import Box from '@mui/material/Box';

import styles from './tab-panel.module.css';
import { TabPanelProps } from './types';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={styles.tabsPanel}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
