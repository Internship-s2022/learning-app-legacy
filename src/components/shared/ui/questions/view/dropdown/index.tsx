import React from 'react';
import { Box } from '@mui/material';

import { Dropdown, Text } from 'src/components/shared/ui';

import { ViewDropdownQuestionProps } from './types';
import styles from './view-dropdown.module.css';

const ViewDropdownQuestion = ({
  name,
  title,
  control,
  options,
}: ViewDropdownQuestionProps): JSX.Element => {
  return (
    <Box>
      <Text className={styles.text} variant="subtitle1" color="primary">
        {title}
      </Text>
      <Dropdown defaultValue=" " name={name} control={control} options={options} />
    </Box>
  );
};

export default ViewDropdownQuestion;
