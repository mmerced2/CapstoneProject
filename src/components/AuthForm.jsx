import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation,useLoginMutation} from "../redux/api";
import React from 'react';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function AuthForm({setToken}) {

  const classes = useStyles();

  const initialForm = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const [form, updateForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const isLogin = location.pathname === "/login";


  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please provide a username and password");
      return;
    }

    const { data, error } = isRegister
      ? await register(form)
      : await login({username: form.username, password: form.password});

    if (error) {
      setError(error.data.message);
      return;
    }
    console.log(data.token)
    setToken(data.token);
    navigate("/account");
  };

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };


  const { username, password, first_name, last_name, email } = form;

  return (

    <section className="padding">


    <Container component="main" maxWidth="xs">
    <CssBaseline />

    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      </Avatar>
      
      <Typography component="h1" variant="h5">
      {isRegister ? "Sign up" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>

        <Grid container spacing={2}>
        {isRegister && ( 
          <Grid className="formDiv" container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="first_name"
              value={first_name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="last_name"
              value={last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          </Grid>
        )}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
            />
          </Grid>

        </Grid>
        <Button
      
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
           {isRegister ? "Sign Up" :"Login"}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item >
            
            <Link href="/login" variant="body2">
            {isRegister ?  "Already have an account? Sign in" :""}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>

  </Container>
  </section>
    

  );
}

export default AuthForm;