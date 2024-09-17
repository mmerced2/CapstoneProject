import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation, useLoginMutation } from "../redux/api";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";

function AuthForm({ setToken }) {
  const initialForm = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const [form, updateForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please provide a username and password");
      return;
    }

    const { data, error } = isRegister
      ? await register(form)
      : await login({ username: form.username, password: form.password });

    if (error) {
      setError(error.data.message);
      return;
    }
    setToken(data.token);
    navigate("/account");
  };

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const { username, password, first_name, last_name, email } = form;

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Avatar
          sx={{ m: 1, width: 56, height: 56, mx: "auto" }}
          variant="rounded"
        >
          <Avatar />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          {isRegister ? "Sign Up" : "Login"}
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {isRegister && (
              <>
                <Grid item xs={12}>
                  <TextField
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    value={email}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="username"
                value={username}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={password}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {isRegister ? "Sign Up" : "Login"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={isRegister ? "/login" : "/register"} variant="body2">
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default AuthForm;
