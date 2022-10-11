import * as React from 'react';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material';

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
    <Box component="div">
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem button key={index}>
            <Button href={listItem.route}>
              <ListItemText primary={listItem.label} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SideList;
