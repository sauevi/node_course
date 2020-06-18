/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

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

const encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await encrypPassword(this.password);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const { password } = this._update;

  if (password) {
    this._update.password = await encrypPassword(password);
  }
  next();
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
