import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import {AppBar} from "@mui/material";
import {Box} from "@mui/material";
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LaP
            </Typography>
            <Grid container justifyContent={"flex-end"}>

            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/products">Products</Button>
            <Button color="inherit" component={Link} to="/account">Account</Button>
            <Button color="inherit" component={Link} to="/myreviews">My Reviews</Button>
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
