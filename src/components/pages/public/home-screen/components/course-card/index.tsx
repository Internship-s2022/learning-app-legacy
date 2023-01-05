import { format, formatDistanceStrict, parseISO } from 'date-fns';
import { es } from 'date-fns/esm/locale';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Chip, Paper } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from './card.module.css';
import { CourseCardProps } from './types';

const CourseCard = ({
  name,
  courseId,
  startDate,
  endDate,
  image,
}: CourseCardProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <Box className={styles.titleContainer}>
        <Text
          variant="h2"
          textAlign="center"
          fontSize="36px"
          fontWeight={600}
          className={styles.title}
        >
          {name}
        </Text>
      </Box>
      <Paper className={styles.imageContainer}>
        <img src={image?.src} alt={image?.alt} className={styles.image} />
        <Chip label="Inscripciones Abiertas" color="inscription" className={styles.chipOpenIncr} />
      </Paper>
      <Chip
        label={`Inicio ${format(parseISO(startDate), 'dd/LL')}`}
        color="secondary"
        className={styles.chipStartDate}
      />
      <Text variant="subtitle1" color="primary" fontWeight={600} textAlign="center">
        {`Duración: ${formatDistanceStrict(parseISO(endDate), parseISO(startDate), {
          unit: 'month',
          locale: es,
        })}`}
      </Text>
      <Button
        size="large"
        variant="contained"
        className={styles.button}
        onClick={() => {
          navigate(`course/${courseId}/inscription/main`);
        }}
      >
        Ver más
      </Button>
    </Card>
  );
};

export default CourseCard;
