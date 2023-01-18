import { createTheme, PaletteColor, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties;
    body2Underline: React.CSSProperties;
    body2Italic: React.CSSProperties;
    headerTable: React.CSSProperties;
    disableText: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
    body2Underline?: React.CSSProperties;
    body2Italic?: React.CSSProperties;
    headerTable?: React.CSSProperties;
    disableText?: React.CSSProperties;
  }

  export interface Palette {
    inscription: Partial<PaletteColor>;
    tableHead: Partial<PaletteColor>;
    admin?: Partial<PaletteColor>;
    student?: Partial<PaletteColor>;
    tutor?: Partial<PaletteColor>;
    auxiliary?: Partial<PaletteColor>;
    title?: Partial<PaletteColor>;
    subtitle?: Partial<PaletteColor>;
    body?: Partial<PaletteColor>;
  }

  export interface PaletteOptions {
    inscription?: Partial<PaletteColor>;
    tableHead?: Partial<PaletteColor>;
    admin?: Partial<PaletteColor>;
    student?: Partial<PaletteColor>;
    tutor?: Partial<PaletteColor>;
    auxiliary?: Partial<PaletteColor>;
    title?: Partial<PaletteColor>;
    subtitle?: Partial<PaletteColor>;
    body?: Partial<PaletteColor>;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    inscription: true;
    admin: true;
    student?: true;
    tutor?: true;
    auxiliary?: true;
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    tutor?: true;
    auxiliary?: true;
    admin?: true;
    student?: true;
    inscription?: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true;
    body2Underline: true;
    body2Italic: true;
    headerTable: true;
    disableText: true;
  }
}

const mainTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    logo: { fontSize: '25px', color: '#373867', fontWeight: 'lighter', fontFamily: 'Inter' },
    h1: { fontSize: '24px', color: '#252525', fontWeight: '600' },
    h2: { fontSize: '18px', color: '#252525', fontWeight: '600' },
    subtitle1: { fontSize: '16px', color: '#464646', fontWeight: '400' },
    subtitle2: { fontSize: '14px', color: '#464646', fontWeight: '400' },
    body1: { fontSize: '14px', color: '#212121', fontWeight: '400' },
    body2: { fontSize: '12px', color: '#212121', fontWeight: '400' },
    body2Underline: {
      fontSize: '12px',
      color: '#212121',
      fontWeight: '400',
      textDecoration: 'underline',
    },
    body2Italic: {
      fontSize: '12px',
      color: '#212121',
      fontWeight: '400',
      fontStyle: 'italic',
    },
    disableText: { fontSize: '12px', color: '#BBBBBB', fontWeight: '400' },
    button: {
      textTransform: 'none',
    },
    headerTable: { fontSize: '14px', color: '#FFFFFF', fontWeight: '400' },
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
      main: '#D32F2F',
    },
    success: {
      main: '#2E7D32',
    },
    inscription: {
      main: '#9747FF',
      contrastText: '#FFFFFF',
    },
    tableHead: {
      main: '#505195',
    },
    title: { main: '#252525' },
    subtitle: { main: '#464646', light: '#7D8893' },
    body: { main: '#212121' },
    admin: { main: '#FFA842', contrastText: '#FFFFFF' },
    student: { main: '#2C95D0', contrastText: '#FFFFFF' },
    tutor: { main: '#4CC539', contrastText: '#FFFFFF' },
    auxiliary: { main: '#BF3AB2', contrastText: '#FFFFFF' },
    divider: '#0000004d',
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
