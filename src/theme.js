import { createTheme } from '@material-ui/core/styles';

const fontSerif = ['Cormorant Garamond', 'Georgia', 'serif'].join(',');
const fontSans = ['Raleway', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',');

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B1A3B',
      light: '#B5294F',
      dark: '#5C0F27',
      contrastText: '#FDF8F0',
    },
    secondary: {
      main: '#C9A84C',
      light: '#DFC278',
      dark: '#9A7E35',
      contrastText: '#1C0C00',
    },
    error: {
      main: '#C62828',
    },
    background: {
      default: '#FDF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C0C00',
      secondary: '#6B4C3B',
    },
  },
  typography: {
    fontFamily: fontSans,
    h1: { fontFamily: fontSerif, fontWeight: 400, letterSpacing: '0.02em' },
    h2: { fontFamily: fontSerif, fontWeight: 400, letterSpacing: '0.02em' },
    h3: { fontFamily: fontSerif, fontWeight: 400, letterSpacing: '0.02em' },
    h4: { fontFamily: fontSerif, fontWeight: 400, letterSpacing: '0.02em' },
    h5: { fontFamily: fontSerif, fontWeight: 600 },
    h6: { fontFamily: fontSerif, fontWeight: 600 },
    subtitle1: { fontFamily: fontSans, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem' },
    body1: { fontFamily: fontSans, lineHeight: 1.8 },
    body2: { fontFamily: fontSans, lineHeight: 1.7 },
    button: { fontFamily: fontSans, fontWeight: 600, letterSpacing: '0.1em' },
  },
  shape: { borderRadius: 2 },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontFamily: fontSans,
        fontWeight: 600,
        fontSize: '0.75rem',
        padding: '12px 32px',
      },
      containedPrimary: {
        backgroundColor: '#8B1A3B',
        color: '#FDF8F0',
        '&:hover': { backgroundColor: '#5C0F27' },
      },
      outlinedPrimary: {
        borderColor: '#8B1A3B',
        color: '#8B1A3B',
        '&:hover': { backgroundColor: '#8B1A3B', color: '#FDF8F0' },
      },
    },
    MuiAppBar: {
      root: { boxShadow: 'none' },
      colorPrimary: {
        backgroundColor: '#FDF8F0',
        color: '#1C0C00',
      },
    },
    MuiTab: {
      root: {
        fontFamily: fontSans,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        fontWeight: 600,
        minWidth: 'unset',
      },
    },
    MuiDivider: {
      root: { backgroundColor: 'rgba(139,26,59,0.15)' },
    },
    MuiInputBase: {
      root: { fontFamily: fontSans },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        '&:hover $notchedOutline': { borderColor: '#8B1A3B' },
        '&$focused $notchedOutline': { borderColor: '#8B1A3B' },
      },
    },
  },
});

export default theme;
