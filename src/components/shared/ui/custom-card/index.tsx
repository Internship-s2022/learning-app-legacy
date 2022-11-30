import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './card.module.css';
import { CustomCardProps } from './types';

const CustomCard = ({ roleType, courseName, courseId }: CustomCardProps): JSX.Element => {
  const navigate = useNavigate();

  const getColorRole = () => {
    if (roleType === 'TUTOR') {
      return '#2C95D0';
    } else if (roleType === 'ADMIN') {
      return '#FFA842';
    } else if (roleType === 'STUDENT') {
      return '#4CC539';
    } else return '#BF3AB2';
  };

  return (
    <Card raised={true} className={styles.cardContainer}>
      <Box className={styles.cardBox} sx={{ backgroundColor: getColorRole() }}>
        <Text className={styles.cardTextTitle} variant={'h1'} color="inscription.contrastText">
          {courseName}
        </Text>
        <Text variant={'h2'} color="inscription.contrastText">
          {capitalizeFirstLetter(roleType.toLowerCase())}
        </Text>
      </Box>
      <Button
        onClick={() => navigate(`/admin/course/${courseId}`)}
        variant="contained"
        className={styles.buttonCard}
        sx={{ backgroundColor: getColorRole() }}
      >
        <Text variant={'h3'} color="inscription.contrastText">
          Ver Curso
        </Text>
      </Button>
    </Card>
  );
};

export default CustomCard;
