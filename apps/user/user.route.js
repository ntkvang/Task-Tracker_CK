const express = require('express');
const passport = require('passport');
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

router.get('/auth',
  passport.authenticate('google',
    { scope: ['profile', 'email'] }
  )
);

router.get('/google/oauthcallback',
  passport.authenticate('google',
    {
      failureRedirect: '/login.html',
      successRedirect: '/'
    }
  )
  // (req, res) => { res.redirect('/') }
);

router.get('/verify', (req, res) => {
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
});

module.exports = router;