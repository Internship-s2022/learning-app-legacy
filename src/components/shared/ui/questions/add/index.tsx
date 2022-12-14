import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Card, CardHeader, Divider, IconButton } from '@mui/material';

import { CustomButton, Text } from 'src/components/shared/ui';
import { confirmEdit, confirmGoBack, invalidForm } from 'src/constants/modal-content';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getQuestions } from 'src/redux/modules/question/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-question.module.css';
import Question from './question';
import { AddQuestionProps } from './types';
import { questionResolver } from './validations';

const AddQuestions = ({ registrationForm, viewId }: AddQuestionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editableIndex, setEditableIndex] = useState(0);

  const { questions } = useAppSelector((state) => state.question);

  useEffect(() => {
    if (registrationForm?._id && viewId)
      dispatch(getQuestions(registrationForm._id.toString(), `?view=${viewId}`));
  }, [registrationForm?._id, viewId]);

  useEffect(() => {
    if (questions.length) setValue('questions', questions);
  }, [questions]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    resolver: questionResolver,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data) => {
    console.log('data', data);
  };

  const handleConfirm = () => {
    handleSubmit(onSubmit)();
  };

  const onSaveClick = () => {
    if (isValid) {
      dispatch(openModal(confirmEdit({ entity: 'formulario', handleConfirm })));
    } else {
      dispatch(openModal(invalidForm));
    }
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
        <Card>
          <CardHeader
            className={styles.cardHeader}
            title={<Text variant="headerTable">Preguntas</Text>}
          />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                className={`${editableIndex !== index && styles.questionAndIconContainer}`}
              >
                <Box className={styles.questionContainer} onClick={() => setEditableIndex(index)}>
                  <Question
                    childIndex={index}
                    isEditable={editableIndex === index}
                    {...{
                      control,
                      watch,
                      setValue,
                      getValues,
                      remove,
                    }}
                  />
                </Box>
                {fields.length !== index + 1 && <Divider />}
              </Box>
            ))}
          </form>
        </Card>
        <Box className={styles.addButtonContainer}>
          <IconButton
            onClick={() => {
              append('');
              setEditableIndex(fields.length);
            }}
          >
            <AddCircleIcon color="secondary" fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box className={styles.buttonsContainer}>
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
          isLoading={false}
          type="submit"
          color="secondary"
          startIcon={<LockIcon />}
          disabled={false}
          onClick={onSaveClick}
        >
          Guardar cambios
        </CustomButton>
      </Box>
    </Box>
  );
};

export default AddQuestions;
