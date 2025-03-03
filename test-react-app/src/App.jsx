import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";
import RoutesList from "./components/RoutesList/RoutesList";

function App() {
  return (
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
  );
}

export default App;
