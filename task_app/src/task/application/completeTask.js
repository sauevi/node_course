const { findTaskById, updateTask } = require('../domain/taskRepository');
// eslint-disable-next-line import/no-commonjs
module.exports = async (id) => {
  const task = await findTaskById(id);
  task.completeTask();
  await updateTask(task);
};
