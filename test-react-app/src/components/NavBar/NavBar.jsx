import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
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
        {isAuthenticated ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              sx={{ marginLeft: "auto" }}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <Typography>{user?.name || "Пользователь"}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton
            component={Link}
            to="/authorization"
            color="inherit"
            sx={{ marginLeft: "auto" }}
          >
            <PersonIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
