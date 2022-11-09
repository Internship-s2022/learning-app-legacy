import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties;
    body2Underline: React.CSSProperties;
    headerTable: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
    body2Underline?: React.CSSProperties;
    headerTable?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true;
    body2Underline: true;
    headerTable: true;
  }
}

const mainTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    logo: { fontSize: '25px', color: '#373867', fontWeight: 'lighter', fontFamily: 'Inter' },
    h1: { fontSize: '24px', color: '#413B3B', fontWeight: 'medium' },
    h2: { fontSize: '16px', color: '#666666', fontWeight: 'regular' },
    h3: { fontSize: '14px', color: '#787777', fontWeight: 'regular' },
    body1: { fontSize: '14px', color: '#555555', fontWeight: 'regular' },
    body2: { fontSize: '12px', color: '#555555', fontWeight: 'regular' },
    body2Underline: {
      fontSize: '12px',
      color: '#555555',
      fontWeight: 'regular',
      textDecoration: 'underline',
    },
    button: {
      textTransform: 'none',
    },
    headerTable: { fontSize: '14px', color: '#FFFFFF', fontWeight: 'regular' },
  },
  palette: {
    primary: {
      main: '#373867',
    },
    secondary: {
      main: '#4F987B',
    },
    info: {
      main: '#BDB4B4',
    },
    error: {
      main: '#E05353',
    },
    success: {
      main: '#078122',
    },
    background: {
      default: '#505195',
    },
    divider: 'rgba(0,0,0,0.3)',
  },
  components: {
    MuiDialogContent: {
      styleOverrides: { root: { width: 500 } },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: '#373867', position: 'static' } },
    },
  },
};

const theme = createTheme(mainTheme);

responsiveFontSizes(theme);

export default theme;
