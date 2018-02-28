const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ProjectModelConfig} = require('../../config/models');

const ProjectSchema = new Schema(ProjectModelConfig);

mongoose.model('Project', ProjectSchema);