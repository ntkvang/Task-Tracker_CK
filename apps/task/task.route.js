const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('./task.model');
const TaskModel = mongoose.model('Task');
const {TaskModelConfig} = require('../../config/models');

router.get('/', (req, res) => {
  TaskModel.find({})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {    
  let newTask = prepareDBObjectBasedOnModelConfig({}, req.body, TaskModelConfig);  
  new TaskModel(newTask)
    .save()
    .then(newTask => {
      res.json({
        message: 'The task was created successfully.'
      });
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.put('/', (req, res) => {
  TaskModel.findOne({
    _id: req.body._id
  })
    .then(foundTask => {      
      foundTask = prepareDBObjectBasedOnModelConfig(foundTask, req.body, TaskModelConfig);
      foundTask.save()
        .then(savedTask => {
          res.json({
            message: 'The task was saved successfully.'
          });
        })
        .catch(err => {
          console.error(err);
          res.json(err);
        });
    })
});

router.delete('/:id', (req, res) => {
  TaskModel.remove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'The task was saved successfully.'
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