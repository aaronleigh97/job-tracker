import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
    },
    background: {
      default: '#12141a',
      paper: '#1e222b',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
})