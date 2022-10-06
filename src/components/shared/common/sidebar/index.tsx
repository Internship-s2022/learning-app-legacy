import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';

const listItems = [
  {
    listText: 'Home',
    route: '/',
  },
  {
    listText: 'Story Book',
    route: '/storybook',
  },
  {
    listText: 'Login',
    route: '/login',
  },
  {
    listText: 'Default',
    route: '/',
  },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box component="div">
      <Avatar src="https://radiumrocket.com/static/rocket-logo-883f208f5b6a41d21540cfecae22fa07.png" />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem button key={index}>
            <Button href={listItem.route}>
              <ListItemText primary={listItem.listText} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <Box component="nav" sx={{ width: '0px', backgroundColor: 'white' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleSlider}>
              <MenuIcon />
            </IconButton>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
