import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

import { Dropdown, InputText, Preloader, Text } from 'src/components/shared/ui';
import { confirmCancel, invalidForm } from 'src/constants/modal-content';
import { Course } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editCourse } from 'src/redux/modules/course/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { getISODate } from 'src/utils/dates';

import styles from './info.module.css';
import { resolverCourse } from './validations';

const CourseInfo = (): JSX.Element => {
  const { course, isLoading } = useAppSelector((state) => state.course);
  const { courseUsers } = useAppSelector((state) => state.courseUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm<Course>({
    defaultValues: {
      name: '',
      description: '',
      isInternal: false,
      type: '',
      isActive: true,
      inscriptionStartDate: '',
      inscriptionEndDate: '',
      startDate: '',
      endDate: '',
    },
    resolver: resolverCourse,
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset({
      name: course?.name || '',
      description: course?.description || '',
      isInternal: !!course?.isInternal,
      type: course?.type || '',
      isActive: !!course?.isActive,
      inscriptionStartDate: course?.inscriptionStartDate
        ? getISODate(new Date(course?.inscriptionStartDate))
        : '',
      inscriptionEndDate: course?.inscriptionEndDate
        ? getISODate(new Date(course?.inscriptionEndDate))
        : '',
      startDate: course?.startDate ? getISODate(new Date(course?.startDate)) : '',
      endDate: course?.endDate ? getISODate(new Date(course?.endDate)) : '',
    });
  }, [course]);

  const onValidSubmit = useCallback(
    async (data: Course) => {
      const response = await dispatch(
        editCourse(course?._id, {
          ...data,
          courseUsers: courseUsers.map((cUser) => ({
            user: cUser.user._id,
            role: cUser.role,
            isActive: cUser.isActive,
          })),
        }),
      );
      if ('error' in response.payload && response.payload.error) {
        dispatch(openModal(invalidForm));
      } else {
        navigate(-1);
      }
    },
    [course, courseUsers],
  );

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => navigate(-1),
          }),
        ),
      );
    } else {
      navigate(-1);
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
            <Text variant="h2">Nombre de curso</Text>
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
              Indica si el curso es para empleados de la empresa o extremos de la misma
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
            <Text variant="subtitle1">Plazo en el cual se pueden postular al curso</Text>
          </div>
          <div className={styles.brotherContainer}>
            <InputText
              className={styles.firstBrother}
              control={control}
              name="inscriptionStartDate"
              label="Fecha de inicio"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputText
              control={control}
              name="inscriptionEndDate"
              label="Fecha de finalizacion"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </section>
        <section className={styles.row}>
          <div className={styles.label}>
            <Text variant="h2">Cursado</Text>
            <Text variant="subtitle1">Plazo durante el cual se dictara el curso</Text>
          </div>
          <div className={styles.brotherContainer}>
            <InputText
              className={styles.firstBrother}
              control={control}
              name="startDate"
              label="Fecha de inicio"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputText
              control={control}
              name="endDate"
              label="Fecha de finalización"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
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
