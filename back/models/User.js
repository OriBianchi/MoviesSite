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
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  seenMovies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  savedMovies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  creationDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
