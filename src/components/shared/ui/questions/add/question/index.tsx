import React, { useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, Radio, Switch } from '@mui/material';

import { Dropdown, InputText, OptionInputText, Text } from 'src/components/shared/ui';

import styles from './question.module.css';
import { QuestionProps } from './types';

const Question = ({
  childIndex,
  isEditable,
  control,
  watch,
  setValue,
  getValues,
}: QuestionProps) => {
  const [checked, setChecked] = useState(false);

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
      <div>{`Enunciado: ${watch(`questions[${childIndex}].title`)}  -  Tipo: ${watch(
        `questions[${childIndex}].type`,
      )}`}</div>
    );
  }

  return (
    <Box className={styles.questionContainer}>
      <Box className={styles.inputContainer}>
        <InputText
          name={`questions[${childIndex}].title`}
          control={control}
          fullWidth={false}
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
            options={[
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
            ]}
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
      </Box>
    </Box>
  );
};

export default Question;
