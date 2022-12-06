import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { registrationFormHeadCells } from 'src/constants/head-cells';
import { View } from 'src/interfaces/entities/registration-form';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './registration-form.module.css';

const RegistrationForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { registrationForm, isLoading, pagination } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );

  useEffect(() => {
    dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
  }, []);

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">Formulario de ingreso</Text>
        <Text variant="subtitle1">Curso {registrationForm?.course?.name}</Text>
      </Box>
      {registrationForm && (
        <CustomTable<View>
          checkboxes={false}
          headCells={registrationFormHeadCells}
          rows={registrationForm?.views}
          isLoading={isLoading}
          deleteIcon={false}
          editIcon={true}
          exportButton={false}
          customIconText="Ver"
          pagination={{ ...pagination, totalDocs: registrationForm?.views.length }}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
        />
      )}
    </section>
  );
};

export default RegistrationForm;
