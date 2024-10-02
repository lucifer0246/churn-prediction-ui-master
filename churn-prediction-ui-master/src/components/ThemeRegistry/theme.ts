import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#84cc16',
      light: '#84cc16',
      dark: '#84cc16',
      contrastText: '#fff',
    },
    background: {

    }
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
