import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { Preloader, Text, ViewRegistrationForm } from 'src/components/shared/ui';
import { AnswersForm } from 'src/interfaces/entities/question';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getQuestions } from 'src/redux/modules/question/thunks';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';

import styles from './view.module.css';

const PublicRegistrationFormView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, viewId } = useParams();
  const { isLoading: isLoadingQuestion } = useAppSelector((state) => state.question);
  const { registrationForm, isLoading } = useAppSelector((state) => state.registrationForm);
  const [viewName, setViewName] = useState('');
  const generalView = registrationForm?.views?.find((view) => view?.name === 'General');
  const questions = useAppSelector((state) =>
    state.question.questions.filter(({ view }) => view === viewId || view === generalView?._id),
  );

  useEffect(() => {
    if (!registrationForm || registrationForm?.course?._id?.toString() !== courseId) {
      dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
    }
  }, [registrationForm, courseId, dispatch]);

  useEffect(() => {
    const viewToGet = registrationForm?.views?.find((view) => view?._id === viewId);
    if (viewToGet) {
      dispatch(getQuestions(registrationForm?._id, ''));
      setViewName(viewToGet?.name);
    }
  }, [dispatch, registrationForm?._id, registrationForm?.views, viewId]);

  const { handleSubmit, control } = useForm<AnswersForm>();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!registrationForm || isLoading || isLoadingQuestion) {
    return <Preloader />;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">
          {registrationForm.title} - {viewName}
        </Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Descripción
        </Text>
        <Text variant="subtitle2">{registrationForm.description}</Text>
      </Box>
      {questions.length > 0 ? (
        <form className={styles.questionsContainer} onSubmit={handleSubmit(onSubmit)}>
          <ViewRegistrationForm
            control={control}
            questions={questions}
            isLoading={isLoadingQuestion}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <Text color="error.main">No hay preguntas para mostrar</Text>
      )}
    </Box>
  );
};

export default PublicRegistrationFormView;
