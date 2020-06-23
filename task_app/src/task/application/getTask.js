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

const getAllTask = async (ownerId, query) => {
  const { completed, limitElements, skipElements } = query;

  const limit = limitElements ? parseInt(limitElements) : 10;
  const skip = skipElements ? parseInt(skipElements) : 0;

  const searchParams = {
    owner: ownerId
  };

  if (completed) {
    searchParams.completed = completed;
  }

  return getAllTaks(searchParams, limit, skip);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getTaskById,
  getAllTask
};
