import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-course.module.css';
import { CourseType } from './types';

const AddCourse = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  const resolver = joiResolver(
    Joi.object<CourseType>({
      name: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Invalid course name, it must contain more than 3 letters',
        'string.max': 'Invalid course name, it must not contain more than 50 letters',
        'any.required': 'Name is a required field',
      }),
      description: Joi.string()
        .pattern(/(.*[a-zA-Z]){4}/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid description, it must contain at least 4 letters',
          'any.required': 'Description is a required field',
        }),
      inscriptionStartDate: Joi.date().greater('now').required().messages({
        'date.greater': 'Invalid inscription start date, it must be after the current date',
        'any.required': 'Inscription start date is a required field',
      }),
      inscriptionEndDate: Joi.date().greater(Joi.ref('inscriptionStartDate')).required().messages({
        'date.greater': 'Invalid inscription end date, it must be after the inscription start date',
        'any.required': 'Inscription end date is a required field',
      }),
      startDate: Joi.date().greater(Joi.ref('inscriptionEndDate')).required().messages({
        'date.greater': 'Invalid start date, it must be after the inscription end date',
        'any.required': 'Start date is a required field',
      }),
      endDate: Joi.date().greater(Joi.ref('startDate')).messages({
        'date.greater': 'Invalid end date, it must be after the course start date',
      }),
      type: Joi.string().max(15).messages({
        'string.max': 'Invalid type, it must not contain more than 15 letters',
      }),
    }),
  );

  const { handleSubmit, control, reset } = useForm<CourseType>({
    defaultValues: {
      name: '',
      description: '',
      inscriptionStartDate: '',
      inscriptionEndDate: '',
      startDate: '',
      endDate: '',
      type: '',
    },
    mode: 'onSubmit',
    resolver,
  });

  const onSubmit = (data) => {
    dispatch(
      openModal({
        title: 'ADD COURSE',
        description: 'aRE YOU SURE??',
        type: 'confirm',
        handleConfirm: () => console.log(data),
      }),
    );
  };

  return (
    <section className={styles.container}>
      <h2>Welcome to add Courses Screen</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <Text variant="h2">Nombre de curso</Text>
          <Text variant="h3">Ingresa el nombre con el cual aparecera el curso</Text>
        </div>
        <div>
          <InputText control={control} name="name" label="Nombre del curso" size="small" />
        </div>
        <div>
          <Text variant="h2">Tipo de curso</Text>
          <Text variant="h3">
            Indica si el curso es para empleados de la empresa o extremos de la misma
          </Text>
        </div>
        <div>
          <InputText control={control} name="type" label="Tipo de curso" size="small" />
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
          />
          -
          <InputText
            control={control}
            name="inscriptionEndDate"
            label="Fecha de finalizacion"
            size="small"
            type={'date'}
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
          />
          -
          <InputText
            control={control}
            name="endDate"
            label="Fecha de finalizacion"
            size="small"
            type={'date'}
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
          />
        </div>
      </form>
      <Button onClick={handleSubmit(onSubmit)} type="submit">
        Add
      </Button>
    </section>
  );
};

export default AddCourse;
