import { useState } from "react";
//import { useRegisterMutation, useLoginMutation } from "../redux/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation,useLoginMutation} from "../redux/api";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';




// const defaultTheme = createTheme();

function AuthForm({setToken}) {
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

  const handleChange = ({ target }) => {
    console.log(target);
    console.log(target.name);
    console.log(target.value);
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please provide a username and password");
      return;
    }

    const { data, error } = isRegister
      ? await register(form)
      : await login(form);

    if (error) {
      setError(error.data.message);
      return;
    }
    console.log(data.token)
    setToken(data.token);
    navigate("/account");
  };

  const { username, password, first_name, last_name, email } = form;

  return (
    

    
    <div>
      <h2>{isRegister ? "Register For" : "Login To"} Life's a Party</h2>
      {error && <p>{error}</p>}
      <form>
        <label>
          Username
          <input name="username" value={username} onChange={handleChange} />
        </label>
        <label>
          Password
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>


        {isRegister ? (
          <div>
            <label>
              First Name
              <input
                name="first_name"
                value={first_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name
              <input
                name="last_name"
                value={last_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input name="email" value={email} onChange={handleChange} />
            </label>
          </div>
        ) : 
        
        (
          <span />
        )}
        <button onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button onClick={() => setShowPassword(!showPassword)}>
        show password
      </button>
    </div>
  );
}

export default AuthForm;