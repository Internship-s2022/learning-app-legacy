import React from 'react';
import { useParams } from 'react-router-dom';

import { CommonTabs, GoBackButton, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';

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
  const { courseId } = useParams();
  const course = useAppSelector((state) =>
    state.auth.userInfo.courses.find((cUser) => cUser.course._id === courseId),
  );

  return (
    <div className={styles.container}>
      <section className={styles.headerContainer}>
        <GoBackButton route={HomeRoutes.home.route} />
        <Text variant="h1">{course.course.name}</Text>
      </section>
      <CommonTabs elements={studentCourseTabs} />
    </div>
  );
};

export default StudentCourse;
