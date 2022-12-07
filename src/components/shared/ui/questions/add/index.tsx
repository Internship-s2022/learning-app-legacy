import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardHeader, Divider, IconButton } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from './add-question.module.css';
import Question from './question';
import { questionResolver } from './validations';

const AddQuestions = (): JSX.Element => {
  const [editableIndex, setEditableIndex] = useState(0);
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    resolver: questionResolver,
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
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1, backgroundColor: '#505195' }}
          title={<Text variant="headerTable">Preguntas generales</Text>}
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
          <button
            className={styles.submit}
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
          >
            SUBMIT
          </button>
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
  );
};

export default AddQuestions;
