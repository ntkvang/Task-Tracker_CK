const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

//load routes
const projectRoute = require('./apps/project/project.route');
const taskRoute = require('./apps/task/task.route');

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use(bodyParser.json());

mongoose.connect(dbConfig.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/project', projectRoute);
app.use('/task', taskRoute)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
