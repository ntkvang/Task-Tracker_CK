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
  user: {
   type: Schema.Types.ObjectId,
   ref: 'User'
  },
  // assigner: {

  // },
    assigner:{
    type: Schema.Types.ObjectId,
        ref:'User'
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
  tags: {
    type: [String]    
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Task', TaskSchema);