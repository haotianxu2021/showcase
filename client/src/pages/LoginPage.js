import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Link} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
          username: username,
          password: password
      });
  
      // console.log(response.data);
  
      // Save the token to local storage (or a cookie) here
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', username);
  
      setUsername('');
      setPassword('');
  
      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      console.log('Error:', error);
    }
  };


  return (
    <Grid container component="main" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0 16px' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
