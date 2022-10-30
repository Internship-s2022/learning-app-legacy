import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { SuperAdminRoutes } from 'src/constants/routes';

import styles from './courses.module.css';
const Courses = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <h2>Welcome to Courses Screen</h2>
      <Link to={SuperAdminRoutes.addCourse.route} key={SuperAdminRoutes.addCourse.label}>
        <Button key={SuperAdminRoutes.addCourse.label}>{SuperAdminRoutes.addCourse.label}</Button>
      </Link>
    </section>
  );
};

export default Courses;
