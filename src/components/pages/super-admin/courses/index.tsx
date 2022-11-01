import React from 'react';
import { Box } from '@mui/material';

import { CommonTabs } from 'src/components/shared/ui';

import AdmissionTestsList from './admission-tests';
import styles from './courses.module.css';
import ListCourses from './list';

const CourseScreenTabs = [
  {
    element: <ListCourses />,
    label: 'Cursos',
  },
  {
    element: <AdmissionTestsList />,
    label: 'Admission Tests',
  },
];

const SuperAdminCourses = (): JSX.Element => {
  return (
    <Box className={styles.container}>
      <CommonTabs elements={CourseScreenTabs} />
    </Box>
  );
};

export default SuperAdminCourses;
