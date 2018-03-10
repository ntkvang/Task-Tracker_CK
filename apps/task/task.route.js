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

router.get('/:id', (req, res) => {
  TaskModel.findOne({_id: req.params.id})
    .populate('project')
    .then(task => {
      res.json(task);
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

router.post('/:id/comment/', (req, res) => {
  TaskModel.findOne({_id: req.params.id})
  .then(foundTask => {
    const newComment = {
      commentBody: req.body.commentBody
    }
    foundTask.comments = foundTask.comments || [];
    foundTask.comments.unshift(newComment);

    foundTask.save()
    .then(() => {
      res.json({
        message: 'The comment was saved successfully.'
      });
    });
  });
});

router.delete('/:id/comment/:commentId', (req, res) => {
  TaskModel.findOne({_id: req.params.id})
  .then(foundTask => {
    foundTask.comments = foundTask.comments || [];
    
    for(var i = 0, iLen = foundTask.comments.length; i < iLen; i++) {
      if(foundTask.comments[i].id === req.params.commentId) {
        foundTask.comments.splice(i, 1);
        break;
      }
    }

    foundTask.save()
    .then(() => {
      res.json({
        message: 'The comment was removed successfully.'
      });
    });
  });
});

function formatTaskForCreating(inputObject) {
  var resultObject = {};
  resultObject.name = inputObject.name;
  resultObject.project = inputObject.projectId;
  resultObject.description = inputObject.description;
  resultObject.startDate = inputObject.startDate;
  resultObject.dueDate = inputObject.dueDate;
  resultObject.status = inputObject.status;
  resultObject.tags = inputObject.tags  
  return resultObject;
}

function formatTaskForEditing(targetObject, inputObject) {
  var resultObject = targetObject;
  resultObject.name = inputObject.name;
  resultObject.project = inputObject.projectId;
  resultObject.description = inputObject.description;
  resultObject.startDate = inputObject.startDate;
  resultObject.dueDate = inputObject.dueDate;
  resultObject.status = inputObject.status;
  resultObject.tags = inputObject.tags  
  return resultObject;
}

module.exports = router;