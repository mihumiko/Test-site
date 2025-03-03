import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            "&:hover": {
              color: "inherit",
            },
          }}
        >
          DROCHILNYA
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/info/about">
            О нас
          </Button>
          <Button color="inherit" component={Link} to="/info/contact">
            Связь
          </Button>
        </Box>
        <IconButton
          component={Link}
          to="/cart"
          color="inherit"
          sx={{ marginLeft: "auto" }}
        >
          <ShoppingBagIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="/authorization"
          color="inherit"
          sx={{ marginLeft: "auto" }}
        >
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
