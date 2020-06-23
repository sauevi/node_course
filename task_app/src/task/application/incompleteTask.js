const { getIncompleteTask } = require('../domain/taskRepository');

// eslint-disable-next-line import/no-commonjs
module.exports = async (ownerId) => {
  const incompleteTask = await getIncompleteTask(ownerId);
  return incompleteTask.length;
};
