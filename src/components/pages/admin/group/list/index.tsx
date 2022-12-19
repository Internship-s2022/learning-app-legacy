import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { AdminRoutes } from 'src/constants/routes';
import { useAppDispatch } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';

import styles from './group.module.css';

const Groups = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [location.pathname]);

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
