import { add, addDays, formatISO, isAfter } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

import { Dropdown, InputText, Preloader, Text } from 'src/components/shared/ui';
import DatePickerInput from 'src/components/shared/ui/inputs/date-picker';
import { confirmCancel, invalidForm } from 'src/constants/modal-content';
import { FormCourse } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editCourse } from 'src/redux/modules/course/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './info.module.css';
import { resolverCourse } from './validations';

const CourseInfo = (): JSX.Element => {
  const { course, isLoading } = useAppSelector((state) => state.course);
  const { courseUsers } = useAppSelector((state) => state.courseUser);
  const dispatch = useAppDispatch();
  const [endMinDate, setEndMinDate] = useState<Date>(undefined);
  const [endInscriptionMinDate, setInscriptionEndMinDate] = useState<Date>(undefined);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
    watch,
    setValue,
  } = useForm<FormCourse>({
    defaultValues: {
      name: '',
      description: '',
      isInternal: false,
      type: '',
      isActive: true,
      inscriptionStartDate: null,
      inscriptionEndDate: null,
      startDate: null,
      endDate: null,
    },
    resolver: resolverCourse,
    mode: 'onSubmit',
  });

  const watchInscriptionStartDate = watch('inscriptionStartDate');
  const watchInscriptionEndDate = watch('inscriptionEndDate');
  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');

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

  const resetForm = useCallback(() => {
    reset({
      name: course?.name || '',
      description: course?.description || '',
      isInternal: !!course?.isInternal,
      type: course?.type || '',
      isActive: !!course?.isActive,
      inscriptionStartDate: course?.inscriptionStartDate
        ? new Date(course?.inscriptionStartDate)
        : null,
      inscriptionEndDate: course?.inscriptionEndDate ? new Date(course?.inscriptionEndDate) : null,
      startDate: course?.startDate ? new Date(course?.startDate) : null,
      endDate: course?.endDate ? new Date(course?.endDate) : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    setCourseStartDate(watchInscriptionEndDate);
    if (isAfter(watchInscriptionEndDate, watchEndDate)) {
      setValue('endDate', addDays(watchStartDate, 1));
    }
  }, [watchInscriptionEndDate]);

  useEffect(() => {
    calcInscriptionEndMinDate(watchInscriptionStartDate);
    if (isAfter(watchInscriptionStartDate, watchInscriptionEndDate)) {
      setValue('inscriptionEndDate', addDays(watchInscriptionStartDate, 1));
    }
    if (isAfter(watchInscriptionStartDate, watchEndDate)) {
      setValue('endDate', addDays(watchStartDate, 1));
    }
  }, [watchInscriptionStartDate]);

  useEffect(() => {
    calcEndMinDate(watchStartDate);
    if (isAfter(watchInscriptionStartDate, watchEndDate)) {
      setValue('endDate', addDays(watchStartDate, 1));
    }
    if (isAfter(watchInscriptionEndDate, watchEndDate)) {
      setValue('endDate', addDays(watchStartDate, 1));
    }
  }, [watchStartDate]);

  const onValidSubmit = useCallback(
    async (data: FormCourse) => {
      const response = await dispatch(
        editCourse(course?._id, {
          ...data,
          inscriptionStartDate: formatISO(
            add(new Date(data.inscriptionStartDate), { hours: 2, minutes: 59 }),
          ),
          inscriptionEndDate: formatISO(
            add(new Date(data.inscriptionEndDate), { hours: 2, minutes: 59 }),
          ),
          startDate: formatISO(add(new Date(data.startDate), { hours: 2, minutes: 59 })),
          endDate: formatISO(add(new Date(data.endDate), { hours: 2, minutes: 59 })),
        }),
      );
      if ('error' in response.payload && response.payload.error) {
        dispatch(openModal(invalidForm));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [course, courseUsers],
  );

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => resetForm(),
          }),
        ),
      );
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onValidSubmit)}>
        <div className={styles.buttons}>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            className={styles.save}
            variant="contained"
            type="submit"
            color="secondary"
            startIcon={<LockIcon />}
            disabled={!isDirty}
          >
            Guardar cambios
          </Button>
        </div>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Nombre del curso</Text>
            <Text variant="subtitle1">Ingresa el nombre con el cual aparecerá el curso</Text>
          </div>
          <InputText
            className={styles.input}
            control={control}
            name="name"
            label="Nombre del curso"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </section>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Tipo de curso y contenido</Text>
            <Text variant="subtitle1">
              Indica si el curso es para empleados de la empresa o externos a la misma
            </Text>
          </div>
          <div className={styles.brotherContainer}>
            <Dropdown
              className={styles.firstBrother}
              options={[
                { value: 'true', label: 'Interno' },
                { value: 'false', label: 'Externo' },
              ]}
              control={control}
              name="isInternal"
              label="Interno o Externo"
              variant="outlined"
              size="small"
              placeholder="Status"
            />
            <Dropdown
              options={[
                { value: 'EXPRESS', label: 'Express' },
                { value: 'FULL', label: 'Full' },
              ]}
              control={control}
              name="type"
              label="Express o Full"
              variant="outlined"
              size="small"
              placeholder="Status"
            />
          </div>
        </section>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Inscripción</Text>
            <Text variant="subtitle1">Plazo en el cual es posible postularse al curso</Text>
          </div>
          <div className={styles.brotherContainer}>
            <DatePickerInput
              control={control}
              name="inscriptionStartDate"
              label="Fecha de inicio"
              className={styles.datePicker}
            />
            <DatePickerInput
              control={control}
              name="inscriptionEndDate"
              label="Fecha de finalización"
              className={styles.datePicker}
              disabled={watchInscriptionStartDate === null}
              minDate={endInscriptionMinDate}
            />
          </div>
        </section>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Cursado</Text>
            <Text variant="subtitle1">Plazo durante el cual se dictará el curso</Text>
          </div>
          <div className={styles.brotherContainer}>
            <DatePickerInput
              control={control}
              name="startDate"
              label="Fecha de inicio"
              className={styles.datePicker}
              disabled={true}
            />
            <DatePickerInput
              control={control}
              name="endDate"
              label="Fecha de finalización"
              className={styles.datePicker}
              disabled={watchInscriptionEndDate === null}
              minDate={endMinDate}
            />
          </div>
        </section>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Descripción del curso</Text>
            <Text variant="subtitle1">
              Breve descripción del curso con detalles que consideres importantes
            </Text>
          </div>
          <InputText
            className={styles.input}
            control={control}
            multiline
            rows={4}
            name="description"
            label="Descripción del curso"
            size="medium"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </section>
      </form>
    </section>
  );
};

export default CourseInfo;
