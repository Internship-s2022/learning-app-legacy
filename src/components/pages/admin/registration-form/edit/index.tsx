import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import AddQuestions from 'src/components/shared/ui/questions/add';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';

import styles from './edit.module.css';

const EditView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewId = searchParams.get('view');

  const { registrationForm } = useAppSelector((state) => state.registrationForm);

  useEffect(() => {
    if (!registrationForm) {
      dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
    }
    if (registrationForm && viewId === null) {
      navigate(location.pathname.replace('/edit', ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationForm]);

  return (
    <Box className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">{`Formulario ${registrationForm?.course?.name} - ${
          registrationForm?.views.find((view) => view._id.toString() === viewId)?.name
        }`}</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Descripción
        </Text>
        <Text variant="subtitle2">{registrationForm?.description}</Text>
      </Box>
      <Divider />
      <AddQuestions registrationForm={registrationForm} viewId={viewId} />
    </Box>
  );
};

export default EditView;
