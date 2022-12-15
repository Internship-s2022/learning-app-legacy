import React from 'react';
import { Box, Checkbox, Radio } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from './start-icon.module.css';
import { StartIconProps } from './types';

const StartIcon = ({ questionType, index, disabled = false }: StartIconProps) => {
  const inputSx = {
    '&.Mui-disabled': {
      color: '#212121',
    },
  };
  switch (questionType) {
    case 'DROPDOWN':
      return (
        <Box className={styles.dropdownStartIconContainer}>
          <Text variant={disabled ? 'disableText' : 'body1'}>{`${index + 1}. `}</Text>
        </Box>
      );
    case 'CHECKBOXES':
      return <Radio disabled={true} sx={disabled ? {} : inputSx} />;
    case 'MULTIPLE_CHOICES':
      return <Checkbox disabled={true} sx={disabled ? {} : inputSx} />;
    default:
      return null;
  }
};

export default StartIcon;
