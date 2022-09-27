import { createTheme, ThemeOptions } from '@mui/material/styles';

const mainTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#1565c0',
    },
    info: {
      main: '#ffeb3b',
    },
    error: {
      main: '#dc281a',
    },
    divider: 'rgba(0,0,0,0.3)',
  },
};
export const theme = createTheme(mainTheme);
