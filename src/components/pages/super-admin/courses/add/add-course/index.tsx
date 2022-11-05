import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-course.module.css';

const AddCourse = ({
  controlAddCourse,
  handleSubmitAddCourse,
  onSubmitAddCourse,
}: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(getUsers(`?isInternal=true&page=${pagination.page}&limit=100${filterQuery}`));
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
            <Text variant="h2">Tipo de curso</Text>
            <Text variant="h3">
              Indica si el curso es para empleados de la empresa o extremos de la misma
            </Text>
          </div>
          <div>
            <InputText
              control={controlAddCourse}
              name="type"
              label="Tipo de curso"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Text variant="h2">Inscripcion</Text>
            <Text variant="h3">Plazo en el cual se pueden postular al curso</Text>
          </div>
          <div className={styles.asd}>
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
            -
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
          <div className={styles.asd}>
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
            -
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
