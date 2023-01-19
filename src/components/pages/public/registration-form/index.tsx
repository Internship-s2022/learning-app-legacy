import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, Skeleton } from '@mui/material';

import PublicScreenFooter from 'src/components/shared/common/public/footer';
import { CustomButton, GoBackButton, Text, ViewRegistrationForm } from 'src/components/shared/ui';
import { alertSend, cannotDoActionAndConfirm, invalidForm } from 'src/constants/modal-content';
import { AnswersForm } from 'src/interfaces/entities/question';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { clearError } from 'src/redux/modules/public/actions';
import {
  createPostulation,
  getPublicCourses,
  getPublicRegistrationForm,
} from 'src/redux/modules/public/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './form.module.css';

const PublicRegistrationForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId, viewId: viewIdParam } = useParams();
  const [goBackRoute, setGoBackRoute] = useState(`/course/${courseId}`);
  const viewId = viewIdParam === 'main' ? '' : viewIdParam;

  const { handleSubmit, control, unregister } = useForm<AnswersForm>({
    mode: 'onChange',
  });

  const { registrationForm, isLoading, courses } = useAppSelector((state) => state.public);

  const personalInfoQuestions = useMemo(
    () => registrationForm?.questions.filter((question) => question.key !== undefined),
    [registrationForm?.questions],
  );

  const questions = useMemo(
    () => registrationForm?.questions.filter((question) => question.key === undefined),
    [registrationForm?.questions],
  );

  useEffect(() => {
    dispatch(getPublicRegistrationForm(courseId, viewId));
  }, [courseId, dispatch, viewId]);

  useEffect(() => {
    if (!courses.length) {
      dispatch(getPublicCourses('?isActive=true'));
    }
  }, [courses, dispatch]);

  useEffect(
    () => () => {
      unregister();
    },
    [registrationForm?.questions, unregister],
  );

  useEffect(() => {
    if (courses.length) {
      const foundedCourse = courses.find((course) => course._id === courseId);
      if (foundedCourse) {
        setGoBackRoute(`/course/${courseId}`);
      } else {
        setGoBackRoute('/');
      }
    }
  }, [courseId, courses, navigate]);

  const onValidSubmit = async (data: Record<string, string | string[]>) => {
    const formattedData = Object.entries(data).map(([question, value]) => ({
      question,
      value,
    }));
    const response = await dispatch(
      createPostulation(courseId, {
        answer: formattedData,
        ...(viewId !== '' ? { view: viewId } : undefined),
      }),
    );
    if (response.error) {
      if (response?.data?.type === 'ACCOUNT_ERROR') {
        dispatch(
          openModal(
            cannotDoActionAndConfirm({
              reason:
                'El Email ingresado ya se encuentra registrado. Por favor contáctate con nosotros a learning@radiumrocket.com.',
              handleConfirm: () => {
                dispatch(clearError);
              },
            }),
          ),
        );
      } else {
        const dniError = response?.message.includes('Postulant with dni');
        dispatch(
          openModal(
            cannotDoActionAndConfirm({
              reason: dniError
                ? 'El DNI ingresado ya se encuentra registrado. Por favor contáctate con nosotros a learning@radiumrocket.com.'
                : 'Algo salió mal, intenta nuevamente en unos minutos.',
              handleConfirm: () => {
                dispatch(clearError);
              },
            }),
          ),
        );
      }
    } else {
      dispatch(
        openModal(
          alertSend({
            entity: 'formulario',
            handleConfirm: () => navigate('/'),
          }),
        ),
      );
    }
  };

  const onInvalidSubmit = () => {
    dispatch(openModal(invalidForm));
  };

  window.scrollTo(0, 0);

  return (
    <Box className={styles.container}>
      <Box component="main" className={styles.main}>
        <Box className={styles.backHomeBtn}>
          <GoBackButton route={goBackRoute} />
        </Box>
        <Box component="section" className={styles.questionsAndTextContainer}>
          <Text variant="h1" color="primary" sx={{ mb: 3 }}>
            {isLoading ? <Skeleton width={300} /> : registrationForm?.title}
          </Text>
          <Text variant="subtitle1">
            {isLoading ? (
              <Skeleton width={340} />
            ) : (
              'Completa el formulario con tus datos y envialos.'
            )}
          </Text>
          <Divider sx={{ my: 5 }}></Divider>
          <Box>
            <Text variant="body1" color="primary" sx={{ mb: 6 }}>
              {isLoading ? <Skeleton width={252} /> : 'Por favor, ingresa tus datos personales:'}
            </Text>
            <form
              className={styles.questionsContainer}
              onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            >
              <ViewRegistrationForm
                questions={personalInfoQuestions}
                control={control}
                isLoading={isLoading}
              />
              <Divider sx={{ my: 5 }}></Divider>
              <ViewRegistrationForm questions={questions} control={control} isLoading={isLoading} />
              <Box className={styles.buttonsContainer}>
                <CustomButton
                  isLoading={isLoading}
                  variant="contained"
                  color="success"
                  onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
                  sx={{ maxWidth: '90px', minWidth: '90px' }}
                >
                  Enviar
                </CustomButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
      <PublicScreenFooter />
    </Box>
  );
};

export default PublicRegistrationForm;
