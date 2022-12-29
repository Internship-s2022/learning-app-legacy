import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { CustomCard, Preloader, Text } from 'src/components/shared/ui';
import { HomeRoutes } from 'src/constants/routes';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getMe } from 'src/redux/modules/auth/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './home.module.css';

const LoggedHome = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);

  useEffect(() => {
    if (authenticated.currentUid && authenticated.userType === 'NORMAL') {
      dispatch(getMe());
    } else {
      navigate(HomeRoutes.landing.route);
    }
  }, [authenticated.currentUid, authenticated.userType, dispatch, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="body2">HOME</Text>
        <Text variant="h1">
          Bienvenido,
          {userInfo?.currentUser?.postulant.firstName
            ? ` ${userInfo?.currentUser?.postulant.firstName}`
            : ''}
          !
        </Text>
        <Text variant="subtitle1">Podés acceder a los a tus cursos activos desde aquí.</Text>
      </Box>
      {userInfo?.courses ? (
        userInfo.courses.map((courseUser) => (
          <CustomCard
            key={courseUser._id}
            courseName={courseUser.course.name}
            roleType={courseUser.role}
            courseId={courseUser.course._id}
          />
        ))
      ) : (
        <Text>No tiene asignado ningún rol en ningún curso.</Text>
      )}
    </section>
  );
};

export default LoggedHome;
