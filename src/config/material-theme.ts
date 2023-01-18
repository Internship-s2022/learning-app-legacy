import { createTheme, PaletteColor, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties;
    headerLink: React.CSSProperties;
    body2Underline: React.CSSProperties;
    body2Italic: React.CSSProperties;
    headerTable: React.CSSProperties;
    disableText: React.CSSProperties;
    description?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
    headerLink?: React.CSSProperties;
    body2Underline?: React.CSSProperties;
    body2Italic?: React.CSSProperties;
    headerTable?: React.CSSProperties;
    disableText?: React.CSSProperties;
    description?: React.CSSProperties;
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
    headerLink: true;
    body2Underline: true;
    body2Italic: true;
    headerTable: true;
    disableText: true;
    description: true;
  }
}

const mainTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 640, // Tablet
      md: 1024, // Laptop
      lg: 1200, // Desktop
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Roboto, Raleway, Inter',
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

export const responsiveTheme = createTheme(mainTheme);
const theme = createTheme(mainTheme);

responsiveTheme.typography.logo = {
  fontSize: '25px',
  color: '#373867',
  fontWeight: 'lighter',
  fontFamily: 'Inter',
  [responsiveTheme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
};

responsiveTheme.typography.h1 = {
  fontSize: '52px',
  color: '#252525',
  fontWeight: '600',
  lineHeight: '67px',
  fontFamily: 'Roboto',
  [responsiveTheme.breakpoints.down('md')]: {
    fontSize: '32px',
    lineHeight: '47px',
  },
  [responsiveTheme.breakpoints.down('sm')]: {
    fontSize: '25px',
    lineHeight: '32px',
  },
};

responsiveTheme.typography.h3 = {
  fontSize: '36px',
  color: '#252525',
  fontWeight: '600',
  lineHeight: '43.2px',
  fontFamily: 'Roboto',
  [responsiveTheme.breakpoints.down('md')]: {
    fontSize: '30px',
    lineHeight: '28.8px',
  },
  [responsiveTheme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
};

responsiveTheme.typography.description = {
  fontSize: '24px',
  color: '#555555',
  fontWeight: '500',
  fontFamily: 'Roboto',
  lineHeight: '29px',
  [responsiveTheme.breakpoints.down('md')]: {
    fontSize: '18px',
    lineHeight: '22px',
  },
  [responsiveTheme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '20px',
  },
};

responsiveTheme.typography.headerLink = {
  fontSize: '20px',
  color: '#555555',
  fontWeight: '500',
  fontFamily: 'Roboto',
  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
  },
};

export default theme;
