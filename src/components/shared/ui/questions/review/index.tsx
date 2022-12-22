import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import OptionsQuestion from './option';
import styles from './review.module.css';
import TextQuestion from './text';
import { ReviewQuestionProps } from './types';

const ReviewQuestion = ({
  title,
  type,
  options,
  isRequired,
  isDeletable = true,
  handleDelete,
}: ReviewQuestionProps): JSX.Element => {
  const questionType =
    type === 'DROPDOWN' || type === 'CHECKBOXES' || type === 'MULTIPLE_CHOICES'
      ? 'options'
      : 'text';

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Text variant="body1">{title}</Text>
        <Text variant="body2Italic" color="secondary">{`Pregunta ${
          isRequired ? '' : 'no '
        }requerida`}</Text>
      </Box>
      <Box className={styles.inputIconContainer}>
        {questionType === 'options' ? (
          <OptionsQuestion options={options} type={type} />
        ) : (
          <TextQuestion title={title} type={type} />
        )}
        {isDeletable && (
          <IconButton className={styles.icon} aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ReviewQuestion;
