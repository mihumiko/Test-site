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
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminPanel() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        <Typography variant="h6">Admin Panel</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "0 auto",
            maxWidth: "30vw",
          }}
        >
          <IconButton component={Link} to="/admin/add" color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton component={Link} to="/admin/edit" color="inherit">
            <EditIcon />
          </IconButton>
          <IconButton component={Link} to="/admin/delete" color="inherit">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
