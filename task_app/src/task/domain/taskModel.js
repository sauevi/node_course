const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
);

const TaskModel = mongoose.model('task', taskSchema);

const validateTask = (task) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    completed: Joi.boolean()
  });

  return schema.validate(task);
};

// eslint-disable-next-line import/no-commonjs
module.exports = { TaskModel, validateTask };
