import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { AdminRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { getGroups } from 'src/redux/modules/group/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './group.module.css';

const Groups = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { groups } = useAppSelector((state: RootReducer) => state.group);
  const { courseUsers } = useAppSelector((state: RootReducer) => state.courseUser);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getGroups(courseId, ''));
    dispatch(getUsersInCourse(courseId, '', true));
  }, [location.pathname]);

  console.log('groups', groups);
  console.log('courseUsers :>> ', courseUsers);

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(AdminRoutes.addGroup.route)}
        >
          Añadir Grupo
        </Button>
      </div>
    </section>
  );
};

export default Groups;
