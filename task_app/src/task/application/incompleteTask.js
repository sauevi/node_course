const { getIncompleteTask } = require('../domain/taskRepository');

// eslint-disable-next-line import/no-commonjs
module.exports = async () => {
  const incompleteTask = await getIncompleteTask();
  return incompleteTask.length;
};
