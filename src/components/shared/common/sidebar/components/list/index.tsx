import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

import styles from './course-list.module.css';
import { CourseListProps } from './types';

const CourseList = ({ toggleSlider, sidebarRoutes }: CourseListProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedIndex(sidebarRoutes?.findIndex((e) => location.pathname.includes(e.route)));
  }, [location.pathname]);

  const handleListItemClick = (route: string, index: number) => {
    navigate(route);
    setSelectedIndex(index);
    toggleSlider();
  };

  return (
    <List className={styles.listContainer}>
      {sidebarRoutes?.map((route, index) => {
        return (
          <ListItemButton
            key={route.label}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(route.route, index)}
          >
            <Box className={styles.rounded} bgcolor={`${route.role.toLowerCase()}.main`} />
            <ListItemText primary={route.label} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default CourseList;
