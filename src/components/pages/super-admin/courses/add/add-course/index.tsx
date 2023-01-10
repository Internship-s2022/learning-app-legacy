import { addDays } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Dropdown, InputText, Text } from 'src/components/shared/ui';
import DatePickerInput from 'src/components/shared/ui/inputs/date-picker';
import { courseInternalOptions, courseOptionsTypeOptions } from 'src/constants/dropdown-options';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-course.module.css';
import { AddCourseProps } from './types';

const AddCourse = ({
  controlAddCourse,
  handleSubmitAddCourse,
  onSubmitAddCourse,
  watch,
  setValue,
}: AddCourseProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, filterQuery } = useAppSelector((state: RootReducer) => state.user);
  const [endMinDate, setEndMinDate] = useState<Date>(null);
  const [endInscriptionMinDate, setInscriptionEndMinDate] = useState<Date>(null);
  const watchInscriptionStartDate = watch('inscriptionStartDate');
  const watchInscriptionEndDate = watch('inscriptionEndDate');
  const watchStartDate = watch('startDate');

  const setCourseStartDate = (inscriptionEndDate: Date) => {
    if (watchInscriptionEndDate !== null) {
      const startDate = addDays(new Date(inscriptionEndDate), 1);
      setValue('startDate', startDate);
    } else {
      setValue('startDate', null);
    }
  };

  const calcEndMinDate = (date: Date) => {
    const minDate = addDays(new Date(date), 1);
    setEndMinDate(minDate);
  };

  const calcInscriptionEndMinDate = (date: Date) => {
    const minDate = addDays(new Date(date), 1);
    setInscriptionEndMinDate(minDate);
  };

  useEffect(() => {
    setCourseStartDate(watchInscriptionEndDate);
  }, [watchInscriptionEndDate]);

  useEffect(() => {
    calcInscriptionEndMinDate(watchInscriptionStartDate);
  }, [watchInscriptionStartDate]);

  useEffect(() => {
    calcEndMinDate(watchStartDate);
  }, [watchStartDate]);

  useEffect(() => {
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  return (
    <section data-testid="add-course-container-section" className={styles.container}>
      <form
        data-testid="add-course-container-form"
        className={styles.form}
        onSubmit={handleSubmitAddCourse(onSubmitAddCourse)}
      >
        <Box className={styles.boxGrid}>
          <div className={styles.textContainer} data-testid="course-name-text">
            <Text variant="h2">Nombre de curso</Text>
            <Text variant="subtitle1">Ingresa el nombre con el cual aparecerá el curso</Text>
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
          <div className={styles.textContainer} data-testid="course-type-text">
            <Text variant="h2">Tipo de curso y contenido</Text>
            <Text variant="subtitle1">
              Indica si el curso es para empleados de la empresa o externos a la misma
            </Text>
          </div>
          <div className={styles.dropdowns}>
            <Dropdown
              options={courseInternalOptions}
              control={controlAddCourse}
              name="isInternal"
              label="Interno o Externo"
              variant="outlined"
              showError={true}
              size="small"
              placeholder="Status"
            />
            <Dropdown
              options={courseOptionsTypeOptions}
              control={controlAddCourse}
              name="type"
              label="Express o Full"
              variant="outlined"
              showError={true}
              size="small"
              placeholder="Status"
            />
          </div>
          <div className={styles.textContainer} data-testid="course-inscription-text">
            <Text variant="h2">Inscripción</Text>
            <Text variant="subtitle1">Plazo en el cual es posible postularse al curso</Text>
          </div>
          <div className={styles.inputBox}>
            <DatePickerInput
              control={controlAddCourse}
              name="inscriptionStartDate"
              label="Fecha de inicio"
              className={styles.datePicker}
            />
            <DatePickerInput
              control={controlAddCourse}
              name="inscriptionEndDate"
              label="Fecha de finalización"
              className={styles.datePicker}
              disabled={watchInscriptionStartDate === null}
              minDate={endInscriptionMinDate}
            />
          </div>
          <div className={styles.textContainer} data-testid="course-duration-text">
            <Text variant="h2">Cursado</Text>
            <Text variant="subtitle1">Plazo durante el cual se dictará el curso</Text>
          </div>
          <div className={styles.inputBox}>
            <DatePickerInput
              control={controlAddCourse}
              name="startDate"
              label="Fecha de inicio"
              className={styles.datePicker}
              disabled={true}
            />
            <DatePickerInput
              control={controlAddCourse}
              name="endDate"
              label="Fecha de finalización"
              className={styles.datePicker}
              disabled={watchInscriptionEndDate === null}
              minDate={endMinDate}
            />
          </div>
          <div className={styles.textContainer} data-testid="course-description-text">
            <Text variant="h2">Descripción del curso</Text>
            <Text variant="subtitle1">
              Breve descripción del curso con detalles considerados importantes
            </Text>
          </div>
          <div>
            <InputText
              control={controlAddCourse}
              multiline
              rows={4}
              name="description"
              label="Descripción del curso"
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
