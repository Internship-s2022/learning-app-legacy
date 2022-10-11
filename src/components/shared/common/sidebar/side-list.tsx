import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material';

import styles from './side-bar.module.css';

const SideList = (): JSX.Element => {
  const listItems = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Story Book',
      route: '/storybook',
    },
    {
      label: 'Login',
      route: '/login',
    },
  ];

  return (
    <Box component="div" className={styles.sideListContainer}>
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem button key={index}>
            <Link to={listItem.route}>
              <Button>
                <ListItemText primary={listItem.label} />
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideList;
