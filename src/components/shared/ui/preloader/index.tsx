import React from 'react';
import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

const styles = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' };

const Preloader = ({ sx = styles, ...props }: CircularProgressProps) => {
  return (
    <Box sx={Object.assign(styles, sx)} {...props}>
      <CircularProgress />
    </Box>
  );
};

export default Preloader;
