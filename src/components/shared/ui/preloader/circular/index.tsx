import React from 'react';
import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

const CircularLoader = ({ ...props }: CircularProgressProps) => {
  return (
    <Box {...props}>
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;
