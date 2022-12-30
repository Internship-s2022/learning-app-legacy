import React, { useMemo } from 'react';
import { Box, Checkbox, Radio } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from './start-icon.module.css';
import { StartIconProps } from './types';

const inputSx = {
  '&.Mui-disabled': {
    color: '#212121',
  },
};

const StartIcon = ({ questionType, index, disabled = false }: StartIconProps) => {
  const icon = useMemo(
    () => ({
      DROPDOWN: (
        <Box className={styles.dropdownStartIconContainer}>
          <Text variant={disabled ? 'disableText' : 'body1'}>{`${index + 1}. `}</Text>
        </Box>
      ),
      CHECKBOXES: <Checkbox disabled={true} sx={disabled ? {} : inputSx} />,
      MULTIPLE_CHOICES: <Radio disabled={true} sx={disabled ? {} : inputSx} />,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return icon[questionType];
};

export default StartIcon;
