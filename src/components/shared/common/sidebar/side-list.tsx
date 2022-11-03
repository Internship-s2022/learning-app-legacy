import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material';

import styles from './side-bar.module.css';
import { SideListProps } from './types';

const SideList = ({ routes }: SideListProps): JSX.Element => {
  return (
    <Box component="div" className={styles.sideListContainer}>
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Divider />
      <List>
        {Object.values(routes).map(
          (route, index) =>
            route.enabled && (
              <ListItem button key={index}>
                <Link to={route.route}>
                  <Button>
                    <ListItemText primary={route.label} />
                  </Button>
                </Link>
              </ListItem>
            ),
        )}
      </List>
    </Box>
  );
};

export default SideList;
