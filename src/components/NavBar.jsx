import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export default function NavBar({ token, setToken }) {
  const navigate = useNavigate();
  const logoutUser = () => {
    setToken(null);
    navigate("/");
  };

  if (token) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LaP
            </Typography>
            <Grid container justifyContent={"flex-end"}>

            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/products">Products</Button>
            <Button color="inherit" component={Link} to="/account">Account</Button>
            <Button color="inherit" component={Link} to="/myreviews">Reviews</Button>
            <Button color="inherit" onClick={logoutUser}>Logout</Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }


  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LaP
        </Typography>
        <Grid container justifyContent={"flex-end"}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/products">Products</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
</Grid>
    
      </Toolbar>
    </AppBar>
  </Box>

  );
}
