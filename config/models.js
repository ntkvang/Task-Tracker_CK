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
  project: {
    type: String
  },
  startDate: {
    type: Date
  },
  dueDate: {
    type: Date
  }
};

module.exports = {
  ProjectModelConfig: projectModelConfig,
  TaskModelConfig: taskModelConfig
}