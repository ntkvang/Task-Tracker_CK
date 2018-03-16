const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Project', ProjectSchema);