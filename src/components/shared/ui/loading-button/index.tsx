import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';

import { LoadingButtonProps } from './types';

const LoadingButton = ({ isLoading, children, ...props }: LoadingButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      {...(isLoading && { disabled: true })}
      {...(isLoading &&
        props.startIcon && { startIcon: <CircularProgress size={20} color="info" /> })}
      sx={{ width: 165 }}
    >
      {isLoading && !props.startIcon ? <CircularProgress size={20} color="info" /> : children}
    </Button>
  );
};

export default LoadingButton;
