import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    setIsAuthenticated(token ? true : false);
    setUsername(username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUsername(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {username && <Typography variant="h6" style={{ flexGrow: 1 }}>{`Hello, ${username}`}</Typography>}
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/projects">Projects</Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
