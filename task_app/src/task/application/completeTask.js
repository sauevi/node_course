const { updateTask } = require('../domain/taskRepository');
// eslint-disable-next-line import/no-commonjs
module.exports = async (id, ownerId) => {
  await updateTask(id, { completed: true }, ownerId);
};
