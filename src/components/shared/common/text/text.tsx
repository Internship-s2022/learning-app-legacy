import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CustomResponsiveFontSizes = (text): JSX.Element => {
  const theme = createTheme({
    typography: {
      h1: {
        color: 'red',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1">Responsive h3</Typography>
    </ThemeProvider>
  );
};

export default CustomResponsiveFontSizes;
