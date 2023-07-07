import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Link} from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
          username: username,
          password: password
      });

      console.log(response.data);
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
        console.log('Error:', error);
    }
  };

  return (
    <Grid container component="main" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography component="h1" variant="h5">
            Sign up
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
