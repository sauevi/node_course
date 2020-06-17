const lodash = require('lodash');
const { findTaskById, getAllTaks } = require('../domain/taskRepository');

const getTaskById = async (id) => {
  const task = await findTaskById(id);

  if (lodash.isEmpty(task)) {
    return {
      error: true
    };
  }

  return task;
};

const getAllTask = async () => getAllTaks();

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getTaskById,
  getAllTask
};
