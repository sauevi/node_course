const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const UserModel = mongoose.model('user', userSchema);

// eslint-disable-next-line import/no-commonjs
module.exports = { UserModel };
