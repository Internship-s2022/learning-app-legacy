import React from 'react';

import { CommonTabs, GoBackButton, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';

import History from './components/history';
import Reports from './components/reports';
import styles from './general.module.css';

const studentCourseTabs = [
  {
    element: <Reports />,
    label: 'Evaluaciones y asistencias',
  },
  {
    element: <History />,
    label: 'MI HISTORIAL',
  },
];

const StudentCourse = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <section className={styles.headerContainer}>
        <GoBackButton route={HomeRoutes.home.route} />
        <Text variant="h1">QA 2022</Text>
      </section>
      <CommonTabs elements={studentCourseTabs} />
    </div>
  );
};

export default StudentCourse;
