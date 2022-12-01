import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ButtonPropsColorOverrides, Card } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './card.module.css';
import { CustomCardProps } from './types';

const CustomCard = ({ roleType, courseName, courseId }: CustomCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);
  let role: string;

  //TO-DO: Implement roleLabel function to be reutilizable
  if (authenticated?.userType === 'NORMAL') {
    switch (roleType) {
      case 'ADMIN':
        role = 'Administrador';
        break;
      case 'TUTOR':
        role = 'Tutor';
        break;
      case 'STUDENT':
        role = 'Alumno';
        break;
      case 'AUXILIARY':
        role = 'Auxiliar';
        break;
      default:
        break;
    }
  } else {
    role = 'Super admin';
  }

  return (
    <Card raised={true} className={styles.cardContainer}>
      <Box className={styles.cardBox} bgcolor={`${roleType.toLowerCase()}.main`}>
        <Text className={styles.cardTextTitle} variant="h1" color="white">
          {courseName}
        </Text>
        <Text variant="h2" color="white">
          {role}
        </Text>
      </Box>
      <Button
        onClick={() => navigate(`/admin/course/${courseId}`)}
        variant="contained"
        className={styles.buttonCard}
        color={roleType.toLowerCase() as keyof ButtonPropsColorOverrides}
      >
        <Text variant="h3" color="white">
          Ver Curso
        </Text>
      </Button>
    </Card>
  );
};

export default CustomCard;
