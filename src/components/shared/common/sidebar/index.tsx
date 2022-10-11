import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar } from '@mui/material';

import SideList from './side-list';

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

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
              <SideList></SideList>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
