const Joi = require('@hapi/joi');
const { updateTask } = require('../domain/taskRepository');

const validateUpdateTaskObject = (task) => {
  const schema = Joi.object({
    description: Joi.string(),
    completed: Joi.boolean()
  });

  return schema.validate(task);
};

// eslint-disable-next-line import/no-commonjs
module.exports = async (id, task, ownerId) => {
  const { error } = validateUpdateTaskObject(task);

  if (error) {
    return { error: true };
  }

  return updateTask(id, task, ownerId);
};
