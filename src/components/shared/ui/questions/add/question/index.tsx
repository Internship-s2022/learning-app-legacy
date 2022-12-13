import React, { useEffect, useState } from 'react';
import { Controller, useController, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, FormControlLabel, IconButton, Radio, Switch } from '@mui/material';

import { Dropdown, InputText, OptionInputText, Text } from 'src/components/shared/ui';
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
  control,
  setValue,
  getValues,
  watch,
  remove,
}: QuestionProps) => {
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  const {
    fieldState: { error },
  } = useController({ name: `questions[${childIndex}].options`, control });

  useEffect(() => {
    setChecked(getValues(`questions[${childIndex}].isRequired`));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setValue(`questions[${childIndex}].isRequired`, event.target.checked);
  };

  const {
    fields,
    remove: removeChild,
    append: appendChild,
  } = useFieldArray({
    control,
    name: `questions[${childIndex}].options`,
  });

  const setStartIcon = (
    questionType: 'DROPDOWN' | 'CHECKBOXES' | 'MULTIPLE_CHOICES',
    index?: number,
  ) => {
    const inputSx = {
      '&.Mui-disabled': {
        color: '#212121',
      },
    };
    switch (questionType) {
      case 'DROPDOWN':
        return (
          <Box className={styles.dropdownStartIconContainer}>
            <Text variant="body1">{`${index + 1}. `}</Text>
          </Box>
        );
      case 'CHECKBOXES':
        return <Radio disabled={true} sx={inputSx} />;
      case 'MULTIPLE_CHOICES':
        return <Checkbox disabled={true} sx={inputSx} />;
      default:
        return null;
    }
  };

  const hasOptions =
    watch(`questions[${childIndex}].type`) === 'DROPDOWN' ||
    watch(`questions[${childIndex}].type`) === 'CHECKBOXES' ||
    watch(`questions[${childIndex}].type`) === 'MULTIPLE_CHOICES';

  if (!isEditable) {
    return (
      <div>
        <p>{`Enunciado: ${getValues(`questions[${childIndex}].title`)} `}</p>
        <p>{`Tipo: ${getValues(`questions[${childIndex}].type`)} (TO BE UPDATED)`}</p>
      </div>
    );
  }

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

  return (
    <Box className={styles.questionContainer}>
      <Box className={styles.inputContainer}>
        <InputText
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
          startIcon={setStartIcon(getValues(`questions[${childIndex}].type`), index)}
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
      {error && hasOptions && (
        <Text variant="body2" color="error">
          {error?.message != undefined ? error?.message : ' '}
        </Text>
      )}
      {hasOptions ? (
        <Button
          onClick={() => {
            appendChild({ value: '' });
          }}
        >
          Agregar opción
        </Button>
      ) : null}
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
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Question;
