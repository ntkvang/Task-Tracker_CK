const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

require('../apps/user/user.model');
//Load user model
const User = mongoose.model('User');


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/user/google/oauthcallback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);

      const image = profile.photos[0].value.substring(0,
        profile.photos[0].value.indexOf('?'));
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      //check for existing user.
      User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) {
            //Return user
            done(null, user);
          } else {
            //Create user
            new User(newUser)
              .save()
              .then(user => done(null, user));
          }
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}