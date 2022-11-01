import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { SuperAdminRoutes } from 'src/constants/routes';

import styles from './courses.module.css';

const Courses = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section className={styles.container}>
      <h2>Welcome to Courses Screen</h2>
      <Button variant="contained" onClick={() => navigate(SuperAdminRoutes.addWithStepper.route)}>
        Add course
      </Button>
    </section>
  );
};

export default Courses;
