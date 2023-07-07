const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const authenticateJWT = require('../middleware/auth');

// Getting all projects
router.get('/', async (req, res) => {
  try {
    const { username } = req.query;
    let projects;
    if (username) {
      projects = await Project.find({ username });
    } else {
      projects = await Project.find();
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', authenticateJWT, async (req, res) => {
    const project = new Project({
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      github: req.body.github,
      demo: req.body.demo,
      highlight: req.body.highlight,
      // Add other properties here
    });
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.patch('/:id', authenticateJWT, getProject, async (req, res) => {
    if (req.body.username != null) {
      res.project.username = req.body.username;
    }
    if (req.body.title != null) {
      res.project.title = req.body.title;
    }
    if (req.body.description != null) {
      res.project.description = req.body.description;
    }
    if (req.body.type != null) {
        res.project.type = req.body.type;
    }
    if (req.body.github != null) {
        res.project.github = req.body.github;
    }
    if (req.body.demo != null) {
        res.project.demo = req.body.demo;
    }
    if (req.body.highlight != null) {
      res.project.highlight = req.body.highlight;
    }
    // Add other properties here
    try {
      const updatedProject = await res.project.save();
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// Deleting one project
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
      const result = await Project.findByIdAndRemove(req.params.id);
      
      if (!result) {
          return res.status(404).json({ message: 'Cannot find project' });
      }

      res.json({ message: 'Deleted Project' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(req.params.id);
        if (project == null) {
        return res.status(404).json({ message: 'Cannot find project' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.project = project;
    next();
}

module.exports = router;
    