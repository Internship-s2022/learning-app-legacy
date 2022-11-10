import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { Dropdown, InputText, Text } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-course.module.css';
import { AddCourseProps } from './types';

const AddCourse = ({
  controlAddCourse,
  handleSubmitAddCourse,
  onSubmitAddCourse,
}: AddCourseProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, filterQuery } = useAppSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmitAddCourse(onSubmitAddCourse)}>
        <Box className={styles.boxGrid}>
          <div>
            <Text variant="h2">Nombre de curso</Text>
            <Text variant="h3">Ingresa el nombre con el cual aparecera el curso</Text>
          </div>
          <div>
            <InputText
              control={controlAddCourse}
              name="name"
              label="Nombre del curso"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Text variant="h2">Tipo de curso y contenido</Text>
            <Text variant="h3">
              Indica si el curso es para empleados de la empresa o extremos de la misma
            </Text>
          </div>
          <div className={styles.dropdowns}>
            <Dropdown
              options={[
                { value: 'true', label: 'Interno' },
                { value: 'false', label: 'Externo' },
              ]}
              control={controlAddCourse}
              name="isInternal"
              label="Interno o Externo"
              variant="outlined"
              showError={true}
              size="small"
              placeholder="Status"
            />
            <Dropdown
              options={[
                { value: 'Express', label: 'Express' },
                { value: 'Full', label: 'Full' },
              ]}
              control={controlAddCourse}
              name="type"
              label="Express o Full"
              variant="outlined"
              showError={true}
              size="small"
              placeholder="Status"
            />
          </div>
          <div>
            <Text variant="h2">Inscripcion</Text>
            <Text variant="h3">Plazo en el cual se pueden postular al curso</Text>
          </div>
          <div className={styles.inputBox}>
            <InputText
              control={controlAddCourse}
              name="inscriptionStartDate"
              label="Fecha de inicio"
              size="small"
              type={'date'}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputText
              control={controlAddCourse}
              name="inscriptionEndDate"
              label="Fecha de finalizacion"
              size="small"
              type={'date'}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Text variant="h2">Cursado</Text>
            <Text variant="h3">Plazo durante el cual se dictara el curso</Text>
          </div>
          <div className={styles.inputBox}>
            <InputText
              control={controlAddCourse}
              name="startDate"
              label="Fecha de inicio"
              size="small"
              type={'date'}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputText
              control={controlAddCourse}
              name="endDate"
              label="Fecha de finalizacion"
              size="small"
              type={'date'}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Text variant="h2">Descripcion del curso</Text>
            <Text variant="h3">
              Breve descripcion del curso con detalles que consideres importantes
            </Text>
          </div>
          <div>
            <InputText
              control={controlAddCourse}
              multiline
              rows={4}
              name="description"
              label="Descripcion del curso"
              size="medium"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Box>
      </form>
    </section>
  );
};

export default AddCourse;
