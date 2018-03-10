const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  project: {
   type: Schema.Types.ObjectId,
   ref: 'Project'
  },
  // assigner: {

  // },
  startDate: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    default: 'Undone'
  },
  tags: {
    type: [String]    
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    }
  }]
});

mongoose.model('Task', TaskSchema);