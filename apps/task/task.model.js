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
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
  tags: [{
	  name: {
		type: String
	  }
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    commentDate: {
      type: Date,
      default: Date.now
    }
  }]
});

mongoose.model('Task', TaskSchema);