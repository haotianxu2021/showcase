const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: false
  },
  demo: {
    type: String,
    required: false
  },
  highlight: {
    type: Boolean,
    required: true
  },
  // add more fields as per your requirement
});

module.exports = mongoose.model('Project', projectSchema);
