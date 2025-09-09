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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingleft: 0,
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
