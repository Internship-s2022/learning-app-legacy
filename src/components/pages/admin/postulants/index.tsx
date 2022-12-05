import React from 'react';
import { Box } from '@mui/material';

import { CommonTabs, Text } from 'src/components/shared/ui';

import ListCorrectedPostulants from './list-corrected';
import ListNotCorrectedPostulants from './list-not-corrected';
import styles from './postulants.module.css';

const PostulantsScreenTabs = [
  {
    element: <ListCorrectedPostulants />,
    label: 'CALIFICADOS',
  },
  {
    element: <ListNotCorrectedPostulants />,
    label: 'SIN CALIFICAR',
  },
];

const Postulants = (): JSX.Element => {
  return (
    <section>
      <div className={styles.titleContainer}>
        <Text variant="h1">Postulantes</Text>
        <Text variant="h3" className={styles.subtitle}>
          Lista con todos los postulantes del curso.
        </Text>
      </div>
      <Box className={styles.container}>
        <CommonTabs elements={PostulantsScreenTabs} />
      </Box>
    </section>
  );
};

export default Postulants;
