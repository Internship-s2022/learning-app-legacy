import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import {
  Dropdown,
  Preloader,
  Text,
  ViewCheckboxQuestion,
  ViewMultipleChoiceQuestion,
  ViewTextQuestion,
} from 'src/components/shared/ui';
import { Option } from 'src/interfaces/entities/question';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getQuestions } from 'src/redux/modules/question/thunks';
import { getRegistrationFormByCourseId } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './view.module.css';

const PublicRegistrationFormView = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { courseId, viewId } = useParams();

  const { questions, isLoading: isLoadingQuestion } = useAppSelector(
    (state: RootReducer) => state.question,
  );

  const { registrationForm, isLoading } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );

  useEffect(() => {
    if (!registrationForm || registrationForm?.course?._id?.toString() !== courseId) {
      dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationForm, courseId]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationForm?._id, viewId]);

  const { handleSubmit, control } = useForm();

  const formatOptions = (options: Option[]) =>
    options.map((option) => ({ label: option.value, value: option._id }));

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
        {questions.map((q, index) => (
          <Box className={styles.questionContainer} key={index}>
            <Text className={styles.questionTitle} variant="subtitle1" color="primary">
              {q.title}
            </Text>
            {(q.type === 'SHORT_ANSWER' || q.type === 'PARAGRAPH') && (
              <ViewTextQuestion name={`questions[${index}]`} type={q.type} control={control} />
            )}
            {q.type === 'DROPDOWN' && (
              <Dropdown
                defaultValue=" "
                name={`questions[${index}]`}
                control={control}
                options={[{ label: 'Seleccionar', value: ' ' }, ...formatOptions(q.options)]}
              />
            )}
            {q.type === 'CHECKBOXES' && (
              <ViewCheckboxQuestion
                name={`questions[${index}]`}
                control={control}
                options={formatOptions(q.options)}
              />
            )}
            {q.type === 'MULTIPLE_CHOICES' && (
              <ViewMultipleChoiceQuestion
                name={`questions[${index}]`}
                control={control}
                options={formatOptions(q.options)}
              />
            )}
          </Box>
        ))}
      </form>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
  );
};

export default PublicRegistrationFormView;
