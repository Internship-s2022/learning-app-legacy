import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Card, Fab } from '@mui/material';

import { CustomButton, Text } from 'src/components/shared/ui';
import { confirmEdit, confirmGoBack, invalidForm } from 'src/constants/modal-content';
import { QuestionType } from 'src/interfaces/entities/question';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editQuestions, getQuestions } from 'src/redux/modules/question/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { isArrayEqual } from 'src/utils/arrays-comparator';
import useScrollPosition from 'src/utils/hooks/useScrollPosition';

import styles from './add-question.module.css';
import Question from './question';
import { AddQuestionProps } from './types';
import { questionResolver } from './validations';

const AddQuestions = ({ registrationForm, viewId }: AddQuestionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scrollPosition = useScrollPosition();

  const [editableIndex, setEditableIndex] = useState(0);
  const [buttonsClassname, setButtonsClassname] = useState(styles.buttonsContainer);

  const { questions, isLoading } = useAppSelector((state) => state.question);

  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    resolver: questionResolver,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (scrollPosition > 160) {
      setButtonsClassname(`${styles.buttonsContainer} ${styles.buttonsContainerFixed}`);
    } else {
      setButtonsClassname(styles.buttonsContainer);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (registrationForm?._id && viewId)
      dispatch(getQuestions(registrationForm._id.toString(), `?view=${viewId}`));
  }, [registrationForm?._id, viewId]);

  useEffect(() => {
    if (questions.length) reset({ questions });
  }, [questions]);

  const formQuestions = watch('questions');

  const onValidSubmit = ({ questions }: { questions: QuestionType[] }) => {
    dispatch(
      openModal(
        confirmEdit({
          entity: 'formulario',
          handleConfirm: () => {
            dispatch(
              editQuestions(
                registrationForm._id.toString(),
                viewId,
                questions.map((question) =>
                  question.options.length ? { ...question } : { ...question, options: null },
                ),
              ),
            );
          },
        }),
      ),
    );
  };

  const onInvalidSubmit = () => {
    dispatch(openModal(invalidForm));
  };

  const onSaveClick = () => {
    handleSubmit(onValidSubmit, onInvalidSubmit)();
  };

  const onCancelClick = () => {
    dispatch(
      openModal(
        confirmGoBack({
          handleConfirm: () => {
            navigate(-1);
          },
        }),
      ),
    );
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.addQuestionContainer}>
        <Card className={styles.card}>
          <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
            <Box className={styles.titleContainer}>
              <Text variant="h2" color="primary">
                Preguntas
              </Text>
            </Box>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                className={styles.questionContainer}
                onClick={() => setEditableIndex(index)}
              >
                <Question
                  isLoading={isLoading}
                  childIndex={index}
                  isEditable={editableIndex === index}
                  questionData={getValues(`questions[${index}]`)}
                  {...{
                    control,
                    watch,
                    setValue,
                    getValues,
                    remove,
                  }}
                />
              </Box>
            ))}
          </form>
          <Box className={styles.addButtonContainer}>
            <Fab
              disabled={isLoading}
              size="small"
              className={styles.addButton}
              onClick={() => {
                append('');
                setEditableIndex(fields.length);
              }}
            >
              <AddCircleIcon color="secondary" fontSize="large" />
            </Fab>
          </Box>
        </Card>
      </Box>
      <Box className={buttonsClassname}>
        <CustomButton
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={onCancelClick}
        >
          Cancelar
        </CustomButton>
        <CustomButton
          variant="contained"
          isLoading={isLoading}
          type="submit"
          color="secondary"
          startIcon={<LockIcon />}
          disabled={!formQuestions?.length || isArrayEqual(formQuestions, questions)}
          onClick={onSaveClick}
        >
          Guardar cambios
        </CustomButton>
      </Box>
    </Box>
  );
};

export default AddQuestions;
