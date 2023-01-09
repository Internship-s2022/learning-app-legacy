import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { CommonTabs, GoBackButton } from 'src/components/shared/ui';
import { useAppDispatch } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { getGroup } from 'src/redux/modules/group/thunks';
import { resetQuery } from 'src/redux/modules/postulant-course/actions';

import styles from './edit-group.module.css';
import EditModules from './edit-module';
import ChangeName from './edit-name';
import AddStudent from './edit-students';
import EditTutor from './edit-tutors';
import GroupInfo from './resume';

const GroupEditScreenTabs = [
  {
    element: <GroupInfo />,
    label: 'RESUMEN',
  },
  {
    element: <ChangeName />,
    label: 'NOMBRE Y TIPO DE GRUPO',
  },
  {
    element: <EditModules />,
    label: 'MÓDULOS',
  },
  {
    element: <EditTutor />,
    label: 'TUTORES',
  },
  {
    element: <AddStudent />,
    label: 'ALUMNOS',
  },
];

const EditGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getGroup(courseId, groupId));
  }, [courseId, dispatch, groupId]);

  const mainRoute = `/admin/course/${courseId}/groups`;

  return (
    <section>
      <Box className={styles.goBackContainer}>
        <GoBackButton route={mainRoute} />
      </Box>
      <Box className={styles.tabContainer}>
        <CommonTabs
          tabStyle={{ maxWidth: 225 }}
          elements={GroupEditScreenTabs}
          onChange={() => dispatch(resetQuery())}
        />
      </Box>
    </section>
  );
};

export default EditGroup;
