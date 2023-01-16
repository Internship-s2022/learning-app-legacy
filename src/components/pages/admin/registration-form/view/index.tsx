import React, { useEffect } from 'react';
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

  const { questions, isLoading: isLoadingQuestion } = useAppSelector((state) => state.question);

  const { registrationForm, isLoading } = useAppSelector((state) => state.registrationForm);

  useEffect(() => {
    if (!registrationForm || registrationForm?.course?._id?.toString() !== courseId) {
      dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
    }
  }, [registrationForm, courseId, dispatch]);

  useEffect(() => {
    if (registrationForm?._id && viewId) {
      const view = registrationForm.views.find((view) => view._id.toString() === viewId);
      const generalView = registrationForm.views.find((view) => view.name === 'General');
      dispatch(
        getQuestions(
          registrationForm._id.toString(),
          `?view=${generalView._id.toString()}${
            view.name === 'General' ? '' : `&view=${view._id.toString()}`
          }`,
        ),
      );
    }
  }, [dispatch, registrationForm._id, registrationForm.views, viewId]);

  const { handleSubmit, control } = useForm<AnswersForm>();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!registrationForm || !questions.length || isLoading || isLoadingQuestion) {
    return <Preloader />;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">{registrationForm.title}</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Descripción
        </Text>
        <Text variant="subtitle2">{registrationForm.description}</Text>
      </Box>
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
    </Box>
  );
};

export default PublicRegistrationFormView;
