const projectModelConfig = {
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
};

const taskModelConfig = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  //projectID: {
  //  type: Schema.Types.ObjectId,
  //  ref: 'Project'
  //},
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
  }
};

module.exports = {
  ProjectModelConfig: projectModelConfig,
  TaskModelConfig: taskModelConfig
}