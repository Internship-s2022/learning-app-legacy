import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar } from '@mui/material';

import styles from './side-bar.module.css';
import SideList from './side-list';

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Box component="nav" className={styles.container}>
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
