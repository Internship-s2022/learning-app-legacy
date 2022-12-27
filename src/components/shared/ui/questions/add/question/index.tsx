import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Controller, useController, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControlLabel, IconButton, Switch } from '@mui/material';

import { Dropdown, InputText, OptionInputText, Text } from 'src/components/shared/ui';
import ReviewQuestion from 'src/components/shared/ui/questions/review';
import StartIcon from 'src/components/shared/ui/questions/start-icon';
import { questionOptions } from 'src/constants/dropdown-options';
import { confirmDelete } from 'src/constants/modal-content';
import { useAppDispatch } from 'src/redux';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './question.module.css';
import { QuestionProps } from './types';

const borderStyle = { borderLeft: 8, borderColor: 'secondary.main' };

const Question = ({ childIndex, isEditable, control, remove, isLoading, watch }: QuestionProps) => {
  const dispatch = useAppDispatch();

  const {
    field: { value },
    fieldState: { error },
  } = useController({ name: `questions.${childIndex}`, control });

  const {
    fields,
    remove: removeChild,
    append: appendChild,
  } = useFieldArray({
    control,
    name: `questions.${childIndex}.options`,
  });

  const type = watch(`questions.${childIndex}.type`);
  const hasOptions = useMemo(
    () => type === 'DROPDOWN' || type === 'CHECKBOXES' || type === 'MULTIPLE_CHOICES',
    [type],
  );
  const currentQuestionOptionsValues = useMemo(() => fields?.map((opt) => opt.value), [fields]);

  const hasEqualOptions = useMemo(
    () => currentQuestionOptionsValues?.length !== new Set(currentQuestionOptionsValues).size,
    [currentQuestionOptionsValues],
  );

  const hasError = useMemo(() => error && Object.keys(error).length > 0, [error]);

  useEffect(() => {
    if (!hasOptions) {
      const removeIndexes = fields.map((_, index) => index);
      removeChild(removeIndexes);
    }
  }, [hasOptions]);

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
        {...value}
        isDeletable={value.key === undefined}
        handleDelete={handleDelete}
        hasError={hasError}
      />
    );
  }

  return (
    <Box className={styles.questionContainer} sx={borderStyle}>
      <Box className={styles.inputContainer}>
        <InputText
          placeholderColor="#FAFAFA"
          className={styles.inputTextContainer}
          name={`questions.${childIndex}.title`}
          control={control}
          fullWidth={true}
          label="Enunciado"
          defaultValue=""
          size="medium"
          disabled={isLoading}
        />
        <Box className={styles.dropdownContainer}>
          <Dropdown
            name={`questions.${childIndex}.type`}
            control={control}
            defaultValue=" "
            size="medium"
            options={questionOptions}
            disabled={isLoading}
          />
        </Box>
      </Box>
      {fields.map((item, index) => (
        <OptionInputText
          placeholderColor="#FAFAFA"
          startIcon={<StartIcon questionType={value.type} index={index} />}
          key={item.id}
          name={`questions.${childIndex}.options.${index}.value`}
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
          name={`questions.${childIndex}.isRequired`}
          defaultValue={false}
          control={control}
          render={({ field: { value, ...rest } }) => (
            <FormControlLabel control={<Switch checked={value} {...rest} />} label="Requerida" />
          )}
        />
        {value.key === undefined && (
          <IconButton aria-label="delete" onClick={handleDelete} disabled={isLoading}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Question;
