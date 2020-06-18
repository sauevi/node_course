const { updateTask } = require('../domain/taskRepository');
// eslint-disable-next-line import/no-commonjs
module.exports = async (id) => {
  await updateTask(id, { completed: true });
};
