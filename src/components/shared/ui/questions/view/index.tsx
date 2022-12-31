import React from 'react';
import { Box, Skeleton } from '@mui/material';

import {
  Dropdown,
  InputText,
  Text,
  ViewCheckboxQuestion,
  ViewMultipleChoiceQuestion,
} from 'src/components/shared/ui';
import { maxDateInputProp } from 'src/constants/input-props';
import { Option } from 'src/interfaces/entities/question';

import { ViewRegistrationFormProps } from './types';
import styles from './view.module.css';

const ViewRegistrationForm = ({
  questions = [],
  control,
  isLoading,
}: ViewRegistrationFormProps): JSX.Element => {
  const formatOptions = (options: Option[]) =>
    options.map((option) => ({ label: option.value, value: option._id }));

  return (
    <Box className={styles.questionsContainer}>
      {isLoading && (
        <>
          {Array(12)
            .fill(1)
            .map((_, index) => (
              <Box className={styles.questionContainer} key={index}>
                <Skeleton height={28} width={140} />
                <Skeleton height={86} />
              </Box>
            ))}
        </>
      )}
      {questions.map((q, index) => {
        const inputName = q._id;
        return (
          <Box className={styles.questionContainer} key={index}>
            <Text className={styles.questionTitle} variant="subtitle1" color="primary">
              {q.title}
            </Text>
            {q.key === 'birthDate' && (
              <InputText
                defaultValue=""
                control={control}
                name={inputName}
                size="medium"
                type="date"
                InputProps={maxDateInputProp}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {(q.type === 'SHORT_ANSWER' || q.type === 'PARAGRAPH') && q.key !== 'birthDate' && (
              // <ViewTextQuestion name={inputName} type={q.type} control={control} />
              <InputText
                defaultValue=""
                name={inputName}
                control={control}
                fullWidth={true}
                variant="outlined"
                multiline={q.type === 'PARAGRAPH'}
                rows={q.type === 'PARAGRAPH' ? 4 : 1}
              />
            )}
            {q.type === 'DROPDOWN' && (
              <Dropdown
                defaultValue=" "
                name={inputName}
                control={control}
                options={[{ label: 'Seleccionar', value: ' ' }, ...formatOptions(q.options)]}
              />
            )}
            {q.type === 'CHECKBOXES' && (
              <ViewCheckboxQuestion
                name={inputName}
                control={control}
                options={formatOptions(q.options)}
              />
            )}
            {q.type === 'MULTIPLE_CHOICES' && (
              <ViewMultipleChoiceQuestion
                name={inputName}
                control={control}
                options={formatOptions(q.options)}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ViewRegistrationForm;
