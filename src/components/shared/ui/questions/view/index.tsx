import React from 'react';
import { Box, Skeleton } from '@mui/material';

import {
  Dropdown,
  InputText,
  Text,
  ViewCheckboxQuestion,
  ViewMultipleChoiceQuestion,
} from 'src/components/shared/ui';
import { Option } from 'src/interfaces/entities/question';
import { setRules } from 'src/utils/validation-rules';

import DatePickerInput from '../../inputs/date-picker';
import { ViewRegistrationFormProps } from './types';
import styles from './view.module.css';

const ViewRegistrationForm = ({
  questions = [],
  control,
  isLoading,
}: ViewRegistrationFormProps): JSX.Element => {
  const formatOptions = (options: Option[]) =>
    options.map((option) => ({ label: option.value, value: option.value }));
  return isLoading ? (
    <Box className={styles.questionsContainer}>
      {Array(12)
        .fill(1)
        .map((_, index) => (
          <Box className={styles.questionContainer} key={index}>
            <Skeleton height={28} width={140} />
            <Skeleton height={86} />
          </Box>
        ))}
    </Box>
  ) : (
    <Box className={styles.questionsContainer}>
      {questions.map((q, index) => {
        const inputName = q._id;
        return (
          <Box className={styles.questionContainer} key={index}>
            <Box className={styles.labelContainer}>
              <Text variant="subtitle1" display="inline" color="primary">
                {q.title}
              </Text>
              {q.isRequired && (
                <Text variant="subtitle1" display="inline" color="error" sx={{ ml: 1 }}>
                  *
                </Text>
              )}
            </Box>
            <Box className={styles.inputContainer}>
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
                <DatePickerInput
                  defaultValue=""
                  control={control}
                  name={inputName}
                  rules={setRules(q)}
                  className={styles.datePicker}
                  size="medium"
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
                  options={formatOptions(q.options)}
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
          </Box>
        );
      })}
    </Box>
  );
};

export default ViewRegistrationForm;
