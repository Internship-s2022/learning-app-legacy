import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CommonTabs } from 'src/components/shared/ui';
import { useAppDispatch } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';

import CourseInfo from './course-info';
import styles from './edit-course.module.css';

const EditCourseTabs = [
  {
    element: <CourseInfo />,
    label: 'NOMBRE Y TIPO DE CURSO',
  },
  {
    element: <></>,
    label: 'ADMINISTRADORES',
  },
  {
    element: <></>,
    label: 'TUTORES',
  },
];

const EditCourse = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseById(id));
    dispatch(getUsersInCourse({ id, query: '?limit=1000' }));
  }, [id]);

  return (
    <section className={styles.container}>
      <CommonTabs elements={EditCourseTabs} />
    </section>
  );
};

export default EditCourse;
