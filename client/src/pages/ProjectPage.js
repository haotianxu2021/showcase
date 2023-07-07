import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, Tooltip } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [github, setGithub] = useState('');
  const [demo, setDemo] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentId, setCurrentId] = useState('');
  let query = useQuery();
  const viewer = query.get("username");
  // console.log(viewer);
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    let username = localStorage.getItem('username');
    if (username == null) {
      username = viewer;
    }
    setIsAuthenticated(token ? true : false);
    setUsername(username);
    const fetchProjects = async () => {
      try {
          const endpoint = username ? `http://13.59.248.45:5000/projects?username=${username}` : 'http://13.59.248.45/projects';
          const response = await axios.get(endpoint);
          setProjects(response.data);
      } catch (err) {
          console.log(err);
      }
    }

    fetchProjects();
  }, []);
  const handleEdit = (project) => {
    setCurrentProject(project);
    setOpenDialog(true);
    setCurrentId(project._id);
  };
  const handleClose = () => {
    setCurrentProject(null);
    setOpenDialog(false);
  };
    
  const handleSubmit = () => {
    handleCreate({ username, title, description, type, github, demo, highlight });
  }
  const handleCreate = async (newProjectData) => {
    try {
      const response = await axios.post('http://13.59.248.45:5000/projects', newProjectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects([...projects, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id, updatedProjectData) => {
    try {
      const response = await axios.patch(`http://13.59.248.45:5000/projects/${id}`, updatedProjectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedProjects = projects.map(project => 
        project._id === id ? response.data : project
      );
      setProjects(updatedProjects);
      setOpenDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.59.248.45:5000/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Check if user is logged in, if not, redirect to login page
  // const token = localStorage.getItem('authToken');
  // if (!token) {
  //   navigate('/login');
  // }

  return (
    <Container>
      <h1>Projects</h1>
      <Grid container spacing={2}>
      {projects.map(project => (
        <Grid item xs={12} sm={6} md={4} key={project._id}>
          <Card>
            <CardContent>
            <Typography variant="h5" style={{ wordWrap: 'break-word' }}>{project.title}</Typography>
            <Typography variant="body1" color="textSecondary" style={{ wordWrap: 'break-word' }}>{project.username}</Typography>
            <Typography variant="body1" color="textSecondary" style={{ wordWrap: 'break-word' }}><b>Type:</b> {project.type}</Typography>
            <Typography variant="body1" color="textSecondary" style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}><b>Description:</b> {project.description}</Typography>
            {project.github && <Typography variant="body1" color="textSecondary" style={{ wordWrap: 'break-word' }}><b>Github:</b> {project.github}</Typography>}
            {project.demo && <Typography variant="body1" color="textSecondary" style={{ wordWrap: 'break-word' }}><b>Demo:</b> {project.demo}</Typography>}

              <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button 
                variant="contained" 
                color="primary" 
                disabled={!isAuthenticated || project.username !== username}
                onClick={() => handleEdit(project)}>
                Edit
              </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  style={{ marginLeft: 8 }} 
                  disabled={!isAuthenticated || project.username !== username}
                  onClick={() => handleDelete(project._id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      </Grid>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your project details here.
          </DialogContentText>
          <form onSubmit={(event) => {
              event.preventDefault();
              handleUpdate(currentId, currentProject);
            }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  value={currentProject?.title || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="type"
                  label="Type"
                  value={currentProject?.type || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, type: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  value={currentProject?.description || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="github"
                  label="Github"
                  value={currentProject?.github || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="demo"
                  label="Demo"
                  value={currentProject?.demo || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, demo: e.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* Add more fields here */}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Form to create a new project */}
      <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth />
        </Grid>
        <Grid item>
          <TextField label="Type" value={type} onChange={e => setType(e.target.value)} required fullWidth />
        </Grid>
        <Grid item>
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} required multiline fullWidth />
        </Grid>
        <Grid item>
          <TextField label="GitHub" value={github} onChange={e => setGithub(e.target.value)} fullWidth />
        </Grid>
        <Grid item>
          <TextField label="Demo" value={demo} onChange={e => setDemo(e.target.value)} fullWidth />
        </Grid>
        <Grid item>
          <Tooltip 
            title="Please log in to create a project." 
            aria-label="add" 
            open={!isAuthenticated} 
          >
            <span>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={!isAuthenticated}
              >
                Create Project
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>

      </form>
    </Container>
  );
};

export default ProjectPage;
