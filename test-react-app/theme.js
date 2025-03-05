import { ThemeProvider, createTheme } from "@mui/material/styles";


export const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ff5722",
      },
      secondary: {
        main: "#dc004e",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });