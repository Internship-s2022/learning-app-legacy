import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useController, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControlLabel, IconButton, Switch } from '@mui/material';

import { Dropdown, InputText, OptionInputText, Text } from 'src/components/shared/ui';
import ReviewQuestion from 'src/components/shared/ui/questions/review';
import StartIcon from 'src/components/shared/ui/questions/start-icon';
import { confirmDelete } from 'src/constants/modal-content';
import { useAppDispatch } from 'src/redux';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './question.module.css';
import { QuestionProps } from './types';

const questionOptions = [
  {
    label: 'Seleccione un tipo',
    value: ' ',
  },
  {
    label: 'Dropdown',
    value: 'DROPDOWN',
  },
  {
    label: 'Short answer',
    value: 'SHORT_ANSWER',
  },
  {
    label: 'Paragraph',
    value: 'PARAGRAPH',
  },
  {
    label: 'Checkbox',
    value: 'CHECKBOXES',
  },
  {
    label: 'Multiple choice',
    value: 'MULTIPLE_CHOICES',
  },
];

const Question = ({
  childIndex,
  isEditable,
  questionData,
  control,
  setValue,
  remove,
  watch,
}: QuestionProps) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(true);

  const {
    fieldState: { error },
  } = useController({ name: `questions[${childIndex}].options`, control });

  const {
    fields,
    remove: removeChild,
    append: appendChild,
  } = useFieldArray({
    control,
    name: `questions[${childIndex}].options`,
  });

  const hasOptions =
    watch(`questions[${childIndex}].type`) === 'DROPDOWN' ||
    watch(`questions[${childIndex}].type`) === 'CHECKBOXES' ||
    watch(`questions[${childIndex}].type`) === 'MULTIPLE_CHOICES';

  const currentQuestionOptionsValues = watch(`questions[${childIndex}].options`)?.map(
    (opt) => opt.value,
  );

  const hasEqualOptions =
    currentQuestionOptionsValues?.length !== new Set(currentQuestionOptionsValues).size;

  useEffect(() => {
    if (!hasOptions) {
      const removeIndexes = fields.map((value, index) => index);
      removeChild(removeIndexes);
    }
  }, [hasOptions]);

  useEffect(() => {
    if (questionData.isRequired) {
      setChecked(questionData.isRequired);
    } else {
      setChecked(true);
    }
    setValue(`questions[${childIndex}].isRequired`, true);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setValue(`questions[${childIndex}].isRequired`, event.target.checked);
  };

  const handleDelete = () => {
    dispatch(
      openModal(
        confirmDelete({
          entity: 'pregunta',
          handleConfirm: () => {
            remove(childIndex);
          },
        }),
      ),
    );
  };

  if (!isEditable) {
    return (
      <ReviewQuestion
        {...questionData}
        isDeletable={questionData.key === undefined}
        handleDelete={handleDelete}
      />
    );
  }

  return (
    <Box className={styles.questionContainer}>
      <Box className={styles.inputContainer}>
        <InputText
          placeholderColor="#FAFAFA"
          className={styles.inputTextContainer}
          name={`questions[${childIndex}].title`}
          control={control}
          fullWidth={true}
          label="Enunciado"
          defaultValue=""
          size="medium"
        />
        <Box className={styles.dropdownContainer}>
          <Dropdown
            name={`questions[${childIndex}].type`}
            control={control}
            defaultValue=" "
            size="medium"
            options={questionOptions}
          />
        </Box>
      </Box>
      {fields.map((item, index) => (
        <OptionInputText
          placeholderColor="#FAFAFA"
          startIcon={<StartIcon questionType={questionData.type} index={index} />}
          key={item.id}
          name={`questions[${childIndex}].options[${index}].value`}
          control={control}
          fullWidth={false}
          label={`Opción ${index + 1}`}
          defaultValue=""
          size="small"
          onCloseClick={() => removeChild(index)}
        />
      ))}
      {hasOptions && (
        <Text variant="body2" color="error">
          {fields.length === 0
            ? 'Debe agregar al menos una opción'
            : hasEqualOptions && !error
            ? 'No debe haber dos opciones iguales'
            : null}
        </Text>
      )}
      {hasOptions && (
        <Button
          onClick={() => {
            appendChild({ value: '' });
          }}
        >
          Agregar opción
        </Button>
      )}
      <Box className={styles.switchButtonContainer}>
        <Controller
          name={`questions[${childIndex}].isRequired`}
          defaultValue={false}
          control={control}
          render={() => (
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Requerida"
            />
          )}
        />
        {questionData.key === undefined && (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Question;
