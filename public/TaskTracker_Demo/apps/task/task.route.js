const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('./task.model');
const TaskModel = mongoose.model('Task');

router.get('/', (req, res) => {
  TaskModel.find({})
    .populate('project')
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {    
  let newTask = formatTaskForCreating(req.body);  
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
      foundTask = formatTaskForEditing(foundTask, req.body);
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

function formatTaskForCreating(inputObject) {
  var resultObject = {};
  resultObject.name = inputObject.name;
  resultObject.description = inputObject.description;
  resultObject.assigner=inputObject.assigner;
  resultObject.startDate = inputObject.startDate;
  resultObject.dueDate = inputObject.dueDate;
  resultObject.project = inputObject.projectId;
  resultObject.status = inputObject.status;
  resultObject.tags = inputObject.tags;
  return resultObject;
}

function formatTaskForEditing(targetObject, inputObject) {
  var resultObject = targetObject;
    resultObject.name = inputObject.name;
    resultObject.description = inputObject.description;
    resultObject.assigner=inputObject.assigner;
    resultObject.startDate = inputObject.startDate;
    resultObject.dueDate = inputObject.dueDate;
    resultObject.project = inputObject.projectId;
    resultObject.status = inputObject.status;
    resultObject.tags = inputObject.tags;
  return resultObject;
}

module.exports = router;