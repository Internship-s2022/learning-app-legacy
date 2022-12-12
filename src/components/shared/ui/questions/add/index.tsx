import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Card, CardHeader, Divider, IconButton } from '@mui/material';

import { CustomButton, Text } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getQuestions } from 'src/redux/modules/question/thunks';

import styles from './add-question.module.css';
import Question from './question';
import { AddQuestionProps } from './types';
// import { questionResolver } from './validations';

const AddQuestions = ({ registrationForm, viewId }: AddQuestionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { questions } = useAppSelector((state) => state.question);

  useEffect(() => {
    if (registrationForm?._id && viewId)
      dispatch(getQuestions(registrationForm._id.toString(), `?view=${viewId}`));
  }, [registrationForm?._id, viewId]);

  useEffect(() => {
    if (questions.length) setValue('questions', questions);
  }, [questions]);

  const [editableIndex, setEditableIndex] = useState(0);

  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    // resolver: questionResolver,
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data) => {
    console.log('data', data);
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
                    }}
                  />
                  <Box className={`${editableIndex === index && styles.iconContainer}`}>
                    <IconButton aria-label="delete" onClick={() => remove(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
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
          onClick={() => {
            navigate(-1);
          }}
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
          onClick={handleSubmit(onSubmit)}
        >
          Guardar cambios
        </CustomButton>
      </Box>
    </Box>
  );
};

export default AddQuestions;
