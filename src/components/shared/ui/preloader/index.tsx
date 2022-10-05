import React from 'react';
import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

const Preloader = ({
  sx = { display: 'flex', justifyContent: 'center' },
  ...props
}: CircularProgressProps) => {
  return (
    <Box sx={sx} {...props}>
      <CircularProgress />
    </Box>
  );
};

export default Preloader;
