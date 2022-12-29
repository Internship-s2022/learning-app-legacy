import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { registrationFormHeadCells } from 'src/constants/head-cells';
import { View } from 'src/interfaces/entities/registration-form';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';

import styles from './registration-form.module.css';

const RegistrationForm = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { registrationForm, isLoading, pagination } = useAppSelector(
    (state) => state.registrationForm,
  );

  useEffect(() => {
    dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
  }, []);

  const handleEdit = (_id: string) => {
    navigate(`edit?view=${_id}`);
  };
  const handleCustomIcon = (_id: string) => {
    navigate(`view/${_id}`);
  };

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1" className={styles.title}>
          Formularios de ingreso
        </Text>
        <Text variant="subtitle1">Lista con las vistas del formulario de ingreso al curso.</Text>
      </Box>
      {registrationForm && (
        <CustomTable<View>
          checkboxes={false}
          headCells={registrationFormHeadCells}
          rows={registrationForm?.views}
          isLoading={isLoading}
          deleteIcon={false}
          editIcon={true}
          handleEdit={handleEdit}
          exportButton={false}
          customIconText="Ver"
          handleCustomIcon={handleCustomIcon}
          pagination={{ ...pagination, totalDocs: registrationForm?.views.length }}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
        />
      )}
    </section>
  );
};

export default RegistrationForm;
