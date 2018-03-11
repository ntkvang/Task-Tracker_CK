const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const keys = require('./config/keys');
const { urlWhiteList } = require('./config/security');

const app = express();
const port = process.env.PORT || 3000;

//Passport Config
require('./config/passport')(passport);

//load routes
const userRoute = require('./apps/user/user.route');
const projectRoute = require('./apps/project/project.route');
const taskRoute = require('./apps/task/task.route');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

//check for user's authorization
app.use((req, res, next) => {
  if (req.isAuthenticated() ||
    urlWhiteList.indexOf(req.path) > -1) {
    return next();
  }
  res.send(401, 'Unauthorized');
});

app.use('/user', userRoute);
app.use('/project', projectRoute);
app.use('/task', taskRoute)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
