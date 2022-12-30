import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CommonTabs, GoBackButton, Text } from 'src/components/shared/ui';
import { UserRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';
import { clearStudentFlow } from 'src/redux/modules/auth/actions';

import History from './components/history';
import Reports from './components/reports';
import styles from './general.module.css';

const studentCourseTabs = [
  {
    element: <Reports />,
    label: 'EVALUACIONES Y ASISTENCIAS',
  },
  {
    element: <History />,
    label: 'MI HISTORIAL',
  },
];

const StudentCourse = (): JSX.Element => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useAppSelector((state) =>
    state.auth.userInfo.courses.find((cUser) => cUser.course._id === courseId),
  );

  useEffect(() => {
    return () => {
      dispatch(clearStudentFlow());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.headerContainer}>
        <GoBackButton route={UserRoutes.main.route} />
        <Text variant="h1">{course?.course?.name}</Text>
      </section>
      <CommonTabs elements={studentCourseTabs} />
    </div>
  );
};

export default StudentCourse;
