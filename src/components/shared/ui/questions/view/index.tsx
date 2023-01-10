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
import { setRules } from 'src/utils/validation-rules';

import { ViewRegistrationFormProps } from './types';
import styles from './view.module.css';

const ViewRegistrationForm = ({
  questions = [],
  control,
  isLoading,
}: ViewRegistrationFormProps): JSX.Element => {
  const formatOptions = (options: Option[]) =>
    options.map((option) => ({ label: option.value, value: option.value }));

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
            <Text variant="subtitle1" color="primary" sx={{ mb: 2 }}>
              {q.title}
            </Text>
            {q.key === 'email' && (
              <InputText
                defaultValue=""
                control={control}
                name={inputName}
                size="medium"
                rules={setRules(q)}
              />
            )}
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
                rules={setRules(q)}
              />
            )}
            {(q.type === 'SHORT_ANSWER' || q.type === 'PARAGRAPH') &&
              q.key !== 'birthDate' &&
              q.key !== 'email' && (
                <InputText
                  defaultValue=""
                  name={inputName}
                  control={control}
                  fullWidth={true}
                  variant="outlined"
                  multiline={q.type === 'PARAGRAPH'}
                  rows={q.type === 'PARAGRAPH' ? 4 : 1}
                  rules={setRules(q)}
                  placeholder={q.key === 'phone' ? 'Ingrese el número sin 0 ni 15' : ''}
                />
              )}
            {q.type === 'DROPDOWN' && (
              <Dropdown
                defaultValue=""
                name={inputName}
                control={control}
                options={[{ label: 'Seleccionar', value: ' ' }, ...formatOptions(q.options)]}
                rules={setRules(q)}
              />
            )}
            {q.type === 'CHECKBOXES' && (
              <ViewCheckboxQuestion
                name={inputName}
                control={control}
                options={formatOptions(q.options)}
                rules={setRules(q)}
              />
            )}
            {q.type === 'MULTIPLE_CHOICES' && (
              <ViewMultipleChoiceQuestion
                name={inputName}
                control={control}
                options={formatOptions(q.options)}
                rules={setRules(q)}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ViewRegistrationForm;
