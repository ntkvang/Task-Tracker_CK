const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('./project.model');
const ProjectModel = mongoose.model('Project');
const {ProjectModelConfig} = require('../../config/models');

router.get('/', (req, res) => {
  ProjectModel.find({})
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {    
  let newProject = prepareDBObjectBasedOnModelConfig({}, req.body, ProjectModelConfig);
  console.log(newProject);
  new ProjectModel(newProject)
    .save()
    .then(newProject => {
      res.json({
        message: 'The project was created successfully.'
      });
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.put('/', (req, res) => {
  ProjectModel.findOne({
    _id: req.body._id
  })
    .then(foundProject => {      
      foundProject = prepareDBObjectBasedOnModelConfig(foundProject, req.body, ProjectModelConfig);
      foundProject.save()
        .then(savedProject => {
          res.json({
            message: 'The project was saved successfully.'
          });
        })
        .catch(err => {
          console.error(err);
          res.json(err);
        });
    })
});

router.delete('/:id', (req, res) => {
  ProjectModel.remove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'The project was saved successfully.'
      });
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

function prepareDBObjectBasedOnModelConfig(outputObject, inputObject, modelConfig) {
  for(var prop in modelConfig) {
    if(modelConfig.hasOwnProperty(prop)) {
      outputObject[prop] = inputObject[prop];
    }
  }
  return outputObject;
}

module.exports = router;