import React from 'react';
import { Box } from '@mui/material';

import { CommonTabs } from 'src/components/shared/ui';
import { useAppDispatch } from 'src/redux';
import { resetQuery } from 'src/redux/modules/postulant-course/actions';

import styles from './edit-group.module.css';
import EditModules from './edit-module';
import ChangeName from './edit-name';
import GroupInfo from './resume';

const GroupEditScreenTabs = [
  {
    element: <GroupInfo />,
    label: 'Resumen',
  },
  {
    element: <ChangeName />,
    label: 'Nombre y tipo de grupo',
  },
  {
    element: <EditModules />,
    label: 'Módulos',
  },
  {
    element: <GroupInfo />,
    label: 'Tutores',
  },
  {
    element: <GroupInfo />,
    label: 'Alumnos',
  },
];

const EditGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <section>
      <Box className={styles.tabContainer}>
        <CommonTabs elements={GroupEditScreenTabs} onChange={() => dispatch(resetQuery())} />
      </Box>
    </section>
  );
};

export default EditGroup;
