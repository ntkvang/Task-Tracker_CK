const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('./user.model');
const UserModel = mongoose.model('User');

router.get('/', (req, res) => {
  UserModel.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {    
  let newUser = formatUserForCreating(req.body);
  console.log(newUser);
  new UserModel(newUser)
    .save()
    .then(newUser => {
      res.json({
        message: 'The user was created successfully.'
      });
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

router.put('/', (req, res) => {
  UserModel.findOne({
    _id: req.body._id
  })
    .then(foundUser => {      
      foundUser = formatUserForEditing(foundUser, req.body);
      foundUser.save()
        .then(savedUser => {
          res.json({
            message: 'The user was saved successfully.'
          });
        })
        .catch(err => {
          console.error(err);
          res.json(err);
        });
    })
});

router.delete('/:id', (req, res) => {
  UserModel.remove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'The user was saved successfully.'
      });
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

function formatUserForCreating(inputObject) {
  var resultObject = {};
  resultObject.name = inputObject.name;
  return resultObject;
}

function formatUserForEditing(targetObject, inputObject) {  
  var resultObject = targetObject;
  resultObject.name = inputObject.name;
  return resultObject;
};

module.exports = router;