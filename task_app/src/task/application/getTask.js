const lodash = require('lodash');
const { findTaskById, getAllTaks } = require('../domain/taskRepository');

const getTaskById = async (id, ownerId) => {
  const task = await findTaskById(id, ownerId);

  if (lodash.isEmpty(task)) {
    return {
      error: true
    };
  }

  return task;
};

const getAllTask = async (ownerId) => getAllTaks(ownerId);

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getTaskById,
  getAllTask
};
