const lodash = require('lodash');
const { findTaskById, updateTask } = require('../domain/taskRepository');
// eslint-disable-next-line import/no-commonjs
module.exports = async (id, description) => {
  const task = await findTaskById(id);

  if (lodash.isEmpty(task)) {
    return { error: true };
  }

  task.setDescription(description);
  await updateTask(task);
  return task;
};
