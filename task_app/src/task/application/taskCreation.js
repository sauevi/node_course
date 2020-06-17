const { saveTask } = require('../domain/taskRepository');

const createTask = async (body) => {
  const { completed } = body;

  const description = body.description.trim();

  return saveTask({ description, completed });
};

// eslint-disable-next-line import/no-commonjs
module.exports.createTask = createTask;
