/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { TaskModel } = require('../../task/domain/taskModel');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024
    },
    avatarImg: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

const encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.pre('save', async function (next) {
  this.password = await encrypPassword(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  let { password } = this._update;

  if (password) {
    password = await encrypPassword(password);
  }
  next();
});

userSchema.pre('findOneAndDelete', async function (next) {
  const { _id } = this._conditions;
  await TaskModel.deleteMany({ owner: _id });
  next();
});

userSchema.virtual('tasks', {
  ref: 'task',
  localField: '_id',
  foreignField: 'owner'
});

const UserModel = mongoose.model('user', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(1024).required()
  });

  return schema.validate(user);
};

// eslint-disable-next-line import/no-commonjs
module.exports = { UserModel, validateUser };
