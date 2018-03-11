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
  let newProject = formatProjectForCreating(req);
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
      foundProject = formatProjectForEditing(foundProject, req);
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

function formatProjectForCreating(responseData) {
  var inputObject = responseData.body || {};
  var resultObject = {};
  resultObject.name = inputObject.name;
  resultObject.description = inputObject.description;
  resultObject.createdBy = responseData.user.id;
  return resultObject;
}

function formatProjectForEditing(targetProject, responseData) {  
  var inputObject = responseData.body || {};
  var resultObject = targetProject;
  resultObject.name = inputObject.name;
  resultObject.description = inputObject.description;
  return resultObject;
};

module.exports = router;