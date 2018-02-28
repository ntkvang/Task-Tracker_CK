const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {TaskModelConfig} = require('../../config/models');

const TaskSchema = new Schema(TaskModelConfig);

mongoose.model('Task', TaskSchema);