import NavBar from "./components/NavBar/NavBar";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";
import RoutesList from "./components/RoutesList/RoutesList";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user && user.role === "ADMIN" && <AdminPanel />}
      <NavBar />
      <RoutesList />
      <Footer />
    </Box>
  );
}

export default App;
