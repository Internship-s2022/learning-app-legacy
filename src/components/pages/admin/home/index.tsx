import React from 'react';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomCard from 'src/components/shared/ui/custom-card';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './home.module.css';

const LandingAdmin = (): JSX.Element => {
  const courses = useAppSelector((state: RootReducer) => state.auth?.userInfo?.courses);
  const currentUser = useAppSelector((state: RootReducer) => state.auth?.userInfo?.currentUser);

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h2">HOME</Text>
        <Text variant="h1">{`Bienvenido, ${currentUser?.postulant.firstName}!`}</Text>
        <Text variant="h3">{'Podés acceder a los a tus cursos activos desde aquí.'}</Text>
      </Box>
      {courses ? (
        courses.map((course, index) => (
          <CustomCard
            key={index}
            courseName={course.course.name}
            roleType={course.role}
            courseId={course.course._id}
          />
        ))
      ) : (
        <Text>No tiene asignado ningún rol en ningún curso.</Text>
      )}
    </section>
  );
};

export default LandingAdmin;
