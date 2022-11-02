import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { createCourse } from 'src/redux/modules/course/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-course.module.css';
import { AddCourseType, CourseType } from './types';
import { resolverCourse } from './validations';

const AddCourse = ({ setCourseId }: AddCourseType): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  const { handleSubmit, control, reset } = useForm<CourseType>({
    defaultValues: {
      name: '',
      description: '',
      inscriptionStartDate: '',
      inscriptionEndDate: '',
      startDate: '',
      endDate: '',
      type: '',
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
        handleConfirm: async () => {
          const response = await dispatch(
            createCourse({ ...data, isInternal: false, isActive: true }),
          );
          setCourseId(response.payload.data._id);
          console.log('response.payload.data._id', response.payload.data._id);
        },
      }),
    );
  };

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.btns}>
          <Button onClick={reset}>Volver</Button>
          <Button onClick={handleSubmit(onSubmit)} type="submit">
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
