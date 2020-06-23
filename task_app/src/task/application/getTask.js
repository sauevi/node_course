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
  // eslint-disable-next-line object-curly-newline
  const { completed, limitElements, skipElements, sortBy } = query;

  const searchParams = {
    owner: ownerId
  };

  if (completed) {
    searchParams.completed = completed;
  }

  const limit = limitElements ? parseInt(limitElements) : 10;
  const skip = skipElements ? parseInt(skipElements) : 0;
  const sort = {};

  if (sortBy) {
    const parts = sortBy.split(':');
    // eslint-disable-next-line prefer-destructuring
    sort[parts[0]] = parts[1];
  } else {
    sort.createdAt = 'desc';
  }

  return getAllTaks(searchParams, limit, skip, sort);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getTaskById,
  getAllTask
};
