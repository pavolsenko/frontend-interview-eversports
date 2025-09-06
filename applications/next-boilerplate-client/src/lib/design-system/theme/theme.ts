import { createTheme, Theme } from '@mui/material'

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#1ea596',
    },
    secondary: {
      main: '#14645a',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Figtree", sans-serif',
  },
  shape: {
    borderRadius: '8px',
  },
})
