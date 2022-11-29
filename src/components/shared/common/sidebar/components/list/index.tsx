import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

import { images } from 'src/assets';
import { Text } from 'src/components/shared/ui';

import { SidebarProps } from '../../types';
import styles from './side-list.module.css';

const SideList = ({ toggleSlider, sidebarRoutes }: SidebarProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(sidebarRoutes?.findIndex((e) => location.pathname.includes(e.route)));
  }, [location.pathname]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    toggleSlider();
  };

  return (
    <Box component="div" className={styles.sideListContainer}>
      <div className={styles.headerSideBar}>
        <img
          src={images.rocketLogo.imagePath}
          alt={images.rocketLogo.alt}
          className={styles.logoImg}
        />
        <Text variant="logo" className={styles.title}>
          <strong>Radium</strong> Learning
        </Text>
      </div>
      <List className={styles.listContainer}>
        {sidebarRoutes?.map((route, index) => {
          return (
            <Link to={route.route} className={styles.buttonHeader} key={index}>
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={route.label} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default SideList;
