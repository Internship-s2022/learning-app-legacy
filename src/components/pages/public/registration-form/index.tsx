import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Divider, Skeleton } from '@mui/material';

import PublicScreenFooter from 'src/components/pages/public/footer';
import { CustomButton, GoBackButton, Text, ViewRegistrationForm } from 'src/components/shared/ui';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationForm]);

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

  window.scrollTo(0, 0);

  return (
    <Box className={styles.container}>
      <Box component="main" className={styles.main}>
        {viewIdParam === 'main' && (
          <Box className={styles.backHomeBtn}>
            <GoBackButton route={`/course/${courseId}`} />
          </Box>
        )}
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
                <Button variant="contained" sx={{ width: '90px' }}>
                  Cancelar
                </Button>
                <CustomButton
                  isLoading={isLoading}
                  variant="contained"
                  type="submit"
                  sx={{ width: '90px' }}
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
