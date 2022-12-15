import React from 'react';
import { TextField } from '@mui/material';

import { TextProps } from './types';

const TextQuestion = ({ title, type }: TextProps): JSX.Element => {
  return (
    <TextField
      label={title}
      fullWidth={true}
      variant="outlined"
      multiline={type === 'PARAGRAPH'}
      rows={type === 'PARAGRAPH' ? 4 : 1}
      disabled
      sx={{
        '& .MuiInputBase-root.Mui-disabled': {
          '& fieldset': {
            borderColor: '#616161',
          },
        },
      }}
    />
  );
};

export default TextQuestion;
