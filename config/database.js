const databaseConfig = {
  mongoURI: 'mongodb://localhost/task-tracker-dev'  
};
if(process.env.NODE_ENV === 'production') {
  databaseConfig.mongoURI = 'mongodb://test:test@ds153198.mlab.com:53198/ov-task-tracker';
}

module.exports = databaseConfig;