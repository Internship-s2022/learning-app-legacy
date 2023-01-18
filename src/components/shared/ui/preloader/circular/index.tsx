import React from 'react';
import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

const CircularLoader = ({ ...props }: CircularProgressProps) => {
  return (
    <Box data-testid="shared-component-circular-loader" {...props}>
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;
