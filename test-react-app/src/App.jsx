import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import RoutesList from "./components/RoutesList/RoutesList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <RoutesList />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
export default App;
