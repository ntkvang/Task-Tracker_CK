if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
} else {
  module.exports = require('./keys_dev');
}