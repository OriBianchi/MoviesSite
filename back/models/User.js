const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  likedMovies: [{
    type: String,
  }],
  seenMovies: [{
    type: String,
  }],
  savedMovies: [{
    type: String,
  }],
  creationDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
