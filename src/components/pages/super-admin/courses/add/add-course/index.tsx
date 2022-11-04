import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-course.module.css';
import { CourseTypes } from './types';
import { resolverCourse } from './validations';

const AddCourse = ({ setCourse }: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(getUsers(`?isInternal=true&page=${pagination.page}&limit=100${filterQuery}`));
  }, [filterQuery]);

  const { handleSubmit, control, reset } = useForm<CourseTypes>({
    defaultValues: {
      name: '',
      description: '',
      inscriptionStartDate: '',
      inscriptionEndDate: '',
      startDate: '',
      endDate: '',
      type: '',
      courseUsers: [],
      isInternal: false,
      isActive: true,
    },
    mode: 'onSubmit',
    resolver: resolverCourse,
  });

  const onSubmit = (data) => {
    dispatch(
      openModal({
        title: 'ADD COURSE',
        description: 'ARE YOU SURE??',
        type: 'confirm',
        handleConfirm: () => {
          setCourse({ ...data, courseUsers: [] });
        },
      }),
    );
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.btns}>
          <Button onClick={reset}>Volver</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Continuar
          </Button>
        </div>
        <Box className={styles.boxGrid}>
          <div>
            <Text variant="h2">Nombre de curso</Text>
            <Text variant="h3">Ingresa el nombre con el cual aparecera el curso</Text>
          </div>
          <div>
            <InputText
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
