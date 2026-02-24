import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6' },
    secondary: { main: '#8B5CF6' },
    background: { default: '#F0F2F5', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 600 },
    body2: { color: '#64748B' },
    caption: { fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, padding: 8 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontFamily: '"DM Sans", sans-serif' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
          fontSize: '0.65rem',
          height: 22,
          borderRadius: 6,
        },
      },
    },
  },
})
