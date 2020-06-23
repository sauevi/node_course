const { saveTask } = require('../domain/taskRepository');

const createTask = async (task, user) => {
  const description = task.description.trim();

  const newTask = { description, completed: task.completed, owner: user.id };

  return saveTask(newTask);
};

// eslint-disable-next-line import/no-commonjs
module.exports.createTask = createTask;
