import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/material';

import { CommonTabs, Text } from 'src/components/shared/ui';
import { useAppDispatch } from 'src/redux';
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
    element: <EditTutor />,
    label: 'Tutores',
  },
  {
    element: <AddStudent />,
    label: 'Alumnos',
  },
];

const EditGroup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();

  useEffect(() => {
    dispatch(getGroup(courseId, groupId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainRoute = `/admin/course/${courseId}/`;

  return (
    <section>
      <Link to={mainRoute} className={styles.backBtn}>
        <ArrowBackIosIcon className={styles.backIcon} />
        <Text>Volver</Text>
      </Link>
      <Box className={styles.tabContainer}>
        <CommonTabs
          style={{ maxWidth: 200 }}
          elements={GroupEditScreenTabs}
          onChange={() => dispatch(resetQuery())}
        />
      </Box>
    </section>
  );
};

export default EditGroup;
