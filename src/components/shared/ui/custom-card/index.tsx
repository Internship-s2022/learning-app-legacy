import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ButtonPropsColorOverrides, Card } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { getRoleLabel } from 'src/utils/formatters';

import styles from './card.module.css';
import { CustomCardProps } from './types';

const CustomCard = ({ roleType, courseName, courseId }: CustomCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);
  let role: string;

  if (authenticated?.userType === 'NORMAL') {
    role = getRoleLabel(roleType);
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
      <Box className={styles.btnContainer}>
        <Button
          onClick={() => navigate(`/admin/course/${courseId}`)}
          variant="contained"
          className={styles.buttonCard}
          color={roleType.toLowerCase() as keyof ButtonPropsColorOverrides}
        >
          <Text variant="body2" color="white" fontWeight="600">
            VER CURSO
          </Text>
        </Button>
      </Box>
    </Card>
  );
};

export default CustomCard;
