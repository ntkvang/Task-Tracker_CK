const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('./project.model');
const ProjectModel = mongoose.model('Project');

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
  let newProject = formatProjectForCreating(req.body);
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
      foundProject = formatProjectForEditing(foundProject, req.body);
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

function formatProjectForCreating(inputObject) {
  var resultObject = {};
  resultObject.name = inputObject.name;
  resultObject.description = inputObject.description;
  return resultObject;
}

function formatProjectForEditing(targetObject, inputObject) {  
  var resultObject = targetObject;
  resultObject.name = inputObject.name;
  resultObject.description = inputObject.description;
  return resultObject;
};

module.exports = router;