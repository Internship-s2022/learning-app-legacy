import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Divider } from '@mui/material';

import PublicScreenFooter from 'src/components/pages/public/footer';
import { Text, ViewRegistrationForm } from 'src/components/shared/ui';
import { alertSend, cannotDoActionAndConfirm, invalidForm } from 'src/constants/modal-content';
import { AnswersForm } from 'src/interfaces/entities/question';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { clearError } from 'src/redux/modules/public/actions';
import { createPostulation, getPublicRegistrationForm } from 'src/redux/modules/public/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './form.module.css';

const PublicRegistrationForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { courseId, viewId: viewIdParam } = useParams();
  const viewId = viewIdParam === 'main' ? '' : viewIdParam;

  const { handleSubmit, control } = useForm<AnswersForm>({
    mode: 'onChange',
  });

  const { registrationForm, isLoading, errorData } = useAppSelector((state) => state.public);

  const personalInfoQuestions = useMemo(
    () => registrationForm?.questions.filter((question) => question.key !== undefined),
    [registrationForm?.questions],
  );

  const questions = useMemo(
    () => registrationForm?.questions.filter((question) => question.key === undefined),
    [registrationForm?.questions],
  );

  useEffect(() => {
    if (!registrationForm) {
      dispatch(getPublicRegistrationForm(courseId, viewId));
    }
  }, [registrationForm]);

  // useEffect(() => {
  //   if (errorData?.message) {
  //     if (errorData?.message.includes('Postulant with dni')) {
  //       dispatch(
  //         openModal(
  //           cannotDoActionAndConfirm({
  //             reason: 'El DNI ingresado ya se encuentra registrado.',
  //             handleConfirm: () => {
  //               dispatch(clearError);
  //             },
  //           }),
  //         ),
  //       );
  //     } else {
  //       dispatch(
  //         openModal(
  //           cannotDoActionAndConfirm({
  //             reason: 'Algo salió mal, intenta nuevamente en unos minutos.',
  //             handleConfirm: () => {
  //               dispatch(clearError);
  //               // TODO: redirect to home?
  //             },
  //           }),
  //         ),
  //       );
  //     }
  //   }
  // }, [errorData]);

  // const handleConfirm = async (data: Record<string, string | string[]>) => {
  //   const formattedData = Object.entries(data).map((answer) => ({
  //     question: answer[0],
  //     value: answer[1],
  //   }));
  //   const response = await dispatch(
  //     createPostulation(courseId, {
  //       answer: formattedData,
  //       ...(viewId !== '' ? { view: viewId } : undefined),
  //     }),
  //   );
  //   if (response.type === 'CREATE_POSTULATION_SUCCESS') {
  //     dispatch(
  //       openModal(
  //         alertSend({
  //           entity: 'formulario',
  //           handleConfirm: () => {
  //             navigate('/');
  //           },
  //         }),
  //       ),
  //     );
  //   }
  // };

  const onValidSubmit = async (data: Record<string, string | string[]>) => {
    const formattedData = Object.entries(data).map((answer) => ({
      question: answer[0],
      value: answer[1],
    }));
    const response = await dispatch(
      createPostulation(courseId, {
        answer: formattedData,
        ...(viewId !== '' ? { view: viewId } : undefined),
      }),
    );
    if (response.type === 'CREATE_POSTULATION_SUCCESS') {
      dispatch(
        openModal(
          alertSend({
            entity: 'formulario',
            handleConfirm: () => navigate('/'),
          }),
        ),
      );
    }
    if (response.type === 'CREATE_POSTULATION_ERROR') {
      const dniError = errorData?.message.includes('Postulant with dni');
      dispatch(
        openModal(
          cannotDoActionAndConfirm({
            reason: dniError
              ? 'El DNI ingresado ya se encuentra registrado.'
              : 'Algo salió mal, intenta nuevamente en unos minutos.',
            handleConfirm: () => {
              dispatch(clearError);
            },
          }),
        ),
      );
    }
  };

  const onInvalidSubmit = () => {
    dispatch(openModal(invalidForm));
  };

  return (
    <Box className={styles.container}>
      <Box component="main" className={styles.main}>
        <Box component="section" className={styles.questionsAndTextContainer}>
          <Text variant="h1" color="primary" sx={{ mb: 3 }}>
            Formulario de Inscripción
          </Text>
          <Text variant="subtitle1">Completa el formulario con tus datos y envialos.</Text>
          <Divider sx={{ my: 5 }}></Divider>
          <Box>
            <Text variant="body1" color="primary" sx={{ mb: 6 }}>
              Por favor, ingresa tus datos personales:
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
              <Divider className={styles.formDivider}></Divider>
              <ViewRegistrationForm questions={questions} control={control} isLoading={isLoading} />
              <Box className={styles.buttonsContainer}>
                <Button variant="contained">Cancelar</Button>
                <Button variant="contained" type="submit">
                  Enviar
                </Button>
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
