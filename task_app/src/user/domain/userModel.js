const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
};

// eslint-disable-next-line import/no-commonjs
module.exports = { UserModel, validateUser };
