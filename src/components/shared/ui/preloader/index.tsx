import React from 'react';
import { Box, CircularProgressProps } from '@mui/material';

import { images } from 'src/assets';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#FAFAFA',
};

const Preloader = ({ sx = styles, ...props }: CircularProgressProps) => {
  return (
    <Box data-testid="shared-compoenent-preloader" sx={Object.assign(styles, sx)} {...props}>
      <img src={images.loadingAnimation.imagePath} alt={images.loadingAnimation.alt} />
    </Box>
  );
};

export default Preloader;
