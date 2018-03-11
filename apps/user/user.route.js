const express = require('express');
const passport = require('passport');
const router = express.Router();

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

module.exports = router;