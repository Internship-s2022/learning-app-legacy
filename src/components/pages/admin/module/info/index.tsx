/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { CommonTabs, Text } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { getModuleById } from 'src/redux/modules/module/thunks';
import { resetQuery } from 'src/redux/modules/postulant-course/actions';
import { RootReducer } from 'src/redux/modules/types';

import ModuleAssistance from './assistance';
import styles from './info.module.css';
import ModuleReport from './reports';

const PostulantsScreenTabs = [
  {
    element: <ModuleReport />,
    label: 'Reportes',
  },
  {
    element: <ModuleAssistance />,
    label: 'Asistencias',
  },
];

const ModuleInfo = (): JSX.Element => {
  const { module } = useAppSelector((state: RootReducer) => state.module);
  const dispatch = useAppDispatch();
  const { courseId, moduleId } = useParams();

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getModuleById(courseId, moduleId));
  }, [courseId, moduleId]);

  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <Text className={styles.title} variant="h1">
          {module?.name}
        </Text>
        <Text className={styles.title} variant="subtitle1">
          {module?.description}
        </Text>
      </div>
      <Box className={styles.container}>
        <CommonTabs elements={PostulantsScreenTabs} onChange={() => dispatch(resetQuery())} />
      </Box>
    </section>
  );
};

export default ModuleInfo;
