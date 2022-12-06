import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';

import { CustomButtonProps } from './types';

const CustomButton = ({
  isLoading = false,
  children,
  ...props
}: CustomButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      {...(isLoading && { disabled: true })}
      {...(isLoading &&
        props.startIcon && { startIcon: <CircularProgress size={20} color="info" /> })}
      size="medium"
    >
      {isLoading && !props.startIcon ? <CircularProgress size={20} color="info" /> : children}
    </Button>
  );
};

export default CustomButton;
