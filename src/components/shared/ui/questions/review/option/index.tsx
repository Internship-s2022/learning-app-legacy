import React from 'react';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import StartIcon from '../../start-icon';
import styles from './option.module.css';
import { OptionsProps } from './types';

const OptionsQuestion = ({ options, type }: OptionsProps): JSX.Element => {
  return (
    <Box>
      {options.map((option, index) => (
        <Box key={index} className={styles.optionContainer}>
          <Box className={styles.startIconContainer}>
            <StartIcon questionType={type} index={index} disabled={true} />
          </Box>
          <Text variant="body1" color="#BBBBBB">
            {option.value}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default OptionsQuestion;
