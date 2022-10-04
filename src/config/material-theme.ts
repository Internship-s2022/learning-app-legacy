import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

const mainTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    h1: { fontSize: '24px', color: '#252525', fontWeight: 'medium' },
    h2: { fontSize: '16px', color: '#666666', fontWeight: 'regular' },
    h3: { fontSize: '12px', color: '#464646', fontWeight: 'regular' },
  },
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
    success: {
      main: '#4caf50',
    },
    divider: 'rgba(0,0,0,0.3)',
  },
};
const theme = createTheme(mainTheme);
responsiveFontSizes(theme);
export default theme;
